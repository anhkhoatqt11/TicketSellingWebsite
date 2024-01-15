import axios from 'axios';
import CryptoJS from 'crypto-js';
import qs from 'qs';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        let apptransid = searchParams.get('apptransid');
        let orderId = extractNumberAfterUnderscore(apptransid);
        console.log("apptransid:" + searchParams.get('apptransid'));

        let postData = {
            app_id: "2553",
            app_trans_id: apptransid,
            mac: "",
        }

        let data = postData.app_id + "|" + postData.app_trans_id + "|" + "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL"; // appid|app_trans_id|key1
        postData.mac = CryptoJS.HmacSHA256(data, "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL").toString();

        let postConfig = {
            method: 'post',
            url: 'https://sb-openapi.zalopay.vn/v2/query',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(postData)
        }

        const response = await axios(postConfig);

        console.log(response.data);

        if (response.data.return_code == 1) {
            await prisma.hoaDon.update({
                where: {
                    id: orderId,
                },
                data: {
                    tinhTrang: "Đã thanh toán",
                },
            })
            return new Response(JSON.stringify({ code: '00', data: response.data, orderId: orderId.toString() }), { status: 200 });
        }
        else {
            return new Response(JSON.stringify({ code: '01', data: "Thanh toán chưa thành công", orderId: orderId.toString() }), { status: 200 });
        }
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}

function extractNumberAfterUnderscore(inputString: string): number | null {
    const underscoreIndex = inputString.indexOf('_');

    if (underscoreIndex !== -1) {
        const charactersAfterUnderscore = inputString.substring(underscoreIndex + 1);
        const parsedNumber = parseInt(charactersAfterUnderscore, 10);

        if (!isNaN(parsedNumber)) {
            return parsedNumber;
        }
    }

    return null;
}