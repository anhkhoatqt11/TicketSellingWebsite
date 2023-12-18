import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useUser = () => {
    const fetchUserInfoById = async (id) => {
        const res = await getRequest({
            endPoint: `/api/user?id=${id}`,
        });
        console.log(res);
        return res;
    };

    const updateUserInfo = async (data) => {
        try {
            const res = await postRequest({
                endPoint: '/api/admin/users/update',
                isFormData: false,
                formData: data,
            })
            toast.success('Thông tin hồ sơ đã được lưu');
            return res;
        } catch (e) {
            console.log(e);  
            toast.error('Cập nhật thông tin thất bại');
            return false;
        }
    
    };

    return {
        fetchUserInfoById,
        updateUserInfo
    };
};
