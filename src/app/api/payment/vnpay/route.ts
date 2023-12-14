import moment from 'moment';


export async function POST(req: Request) {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        const body = await req.json();
        console.log(body);
        let ipAddr = '127.0.0.1';


        let tmnCode = process.env.NEXT_PUBLIC_VNP_TMNCODE;
        let secretKey = process.env.NEXT_PUBLIC_VNP_HASHSECERT;
        let vnpUrl = process.env.NEXT_PUBLIC_VNP_URL;
        let returnUrl = process.env.NEXT_PUBLIC_VNP_RETURNURL;
        let amount = body.amount;
        let bankCode = body.bankCode;

        let locale = body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = body.orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + body.orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        //Neu muon dung Redirect thi dong dong ben duoi
        return new Response(JSON.stringify({ code: '00', data: vnpUrl }), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
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

