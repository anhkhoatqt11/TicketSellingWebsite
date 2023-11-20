import { postRequest } from "@/lib/fetch"



export const useBooking = () => {
    
    
    const uploadPaymentInfo = async (data) => {
        try{
            const res = await postRequest({
                endPoint: '/api/payment/vnpay',
                isFormData: false,
                formData: data,
            })
            console.log(res);
            return res;
        } catch (e) {
            console.log(e);
            return false;
        }
    } 

    return {
        uploadPaymentInfo
    }

}