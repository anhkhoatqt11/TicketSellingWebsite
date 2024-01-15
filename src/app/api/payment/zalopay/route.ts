import moment from 'moment';
import CryptoJS from 'crypto-js';
import axios from 'axios';

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const embed_data = {
            redirecturl: process.env.NEXT_PUBLIC_ZLP_REDIRECTURL,
        };

        const items = [{}];
        const order = {
            app_id: "2553",
            app_trans_id: `${moment().format('YYMMDD')}_${body.orderId}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: body.amount,
            description: `Thanh toan dich vu TicketNow - Don hang #${body.orderId}`,
            bank_code: "",
            mac: "",
        };


        const data = "2553" + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL").toString();
        //https://sandbox.zalopay.com.vn/v001/tpe/createorder
        const response = await axios.post("https://sb-openapi.zalopay.vn/v2/create", null, { params: order });


        console.log(response.data);

        const output = {
            order: order,
            response: response.data
        }

        return new Response(JSON.stringify({ code: '00', data: output }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(error, { status: 500 });
    }
}
