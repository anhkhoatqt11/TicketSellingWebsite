import { getRequest, postRequest } from "@/lib/fetch"



export const useBooking = () => {

    const uploadBillingInfo = async (data) => {
        try {
            const res = await postRequest({
                endPoint: '/api/billing/add',
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

    const uploadPaymentInfo = async (data) => {
        try {
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

    const uploadZaloPaymentInfo = async (data) => {
        try {
            const res = await postRequest({
                endPoint: '/api/payment/zalopay',
                isFormData: false,
                formData: data,
            });
            console.log(res);
            return res;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    const fetchPaymentStatus = async (props = {}) => {
        const searchParams = new URLSearchParams(window.location.search);
        const endPointUrl = `/api/payment/vnpay/ipn?${searchParams.toString()}`;

        try {
            const res = await getRequest({ endPoint: endPointUrl });
            console.log(res);
            return res;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const fetchZalopaymentStatus = async (props = {}) => {
        const searchParams = new URLSearchParams(window.location.search);
        const endPointUrl = `/api/payment/zalopay/ipn?${searchParams.toString()}`;

        try {
            const res = await getRequest({ endPoint: endPointUrl });
            console.log(res);
            return res;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const fetchOrderInfo = async (id) => {
        const res = await getRequest({
            endPoint: `/api/billing?id=${id}`,
        });
        return res;
    }

    const fetchCoupon = async (coupon) => {
        const res = await getRequest({
            endPoint: `/api/billing/coupon?coupon=${coupon}`,
        });
        return res;
    }

    return {
        uploadBillingInfo,
        uploadPaymentInfo,
        fetchPaymentStatus,
        fetchOrderInfo,
        fetchCoupon,
        uploadZaloPaymentInfo,
        fetchZalopaymentStatus,
    }

}