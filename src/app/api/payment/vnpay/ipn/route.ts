import prisma from '@/lib/prisma';


export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        let secureHash = searchParams.get('vnp_SecureHash');

        let orderId = searchParams.get('vnp_TxnRef');
        const id = parseInt(searchParams.get('vnp_TxnRef'));
        console.log("id:" + searchParams.get('vnp_TxnRef'));

        let rspCode = searchParams.get('vnp_ResponseCode');

        let secretKey = process.env.NEXT_PUBLIC_VNP_HASHSECERT;
        let querystring = require('qs');
        let signData = querystring.stringify(searchParams, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        const hoaDon = await prisma.hoaDon.findMany({
            where: {
                id: {
                    equals: id,
                }
            },
        })

        console.log(secureHash);
        console.log(signed);
        console.log("secure hash true");
        if (hoaDon[0].tinhTrang == "Chưa thanh toán") {
            if (rspCode == "00") {
                await prisma.hoaDon.update({
                    where: {
                        id: id,
                    },
                    data: {
                        tinhTrang: "Đã thanh toán",
                    },
                })
                return new Response(JSON.stringify({ code: '00', data: 'Thanh toán thành công', orderId: id.toString() }), { status: 200 });
            } else {
                return new Response(JSON.stringify({ code: '01', data: 'Thanh toán thất bại', orderId: id.toString() }), { status: 200 });
            }

        } else if (hoaDon[0].tinhTrang == "Đã thanh toán") {
            return new Response(JSON.stringify({ code: '00', data: 'Thanh toán thành công', orderId: id.toString() }), { status: 200 });
        } else {
            await prisma.hoaDon.delete({
                where: {
                    id: id,
                }
            });
            await prisma.hoaDonVe.deleteMany({
                where: {
                    hoaDonId: id,
                }
            });
            return new Response(JSON.stringify({ code: '01', data: 'Thanh toán thất bại', orderId: id.toString() }), { status: 200 });
        }
    } catch (e) {
        return new Response(e, { status: 500 });
    }
}

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
