import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useUser = () => {
    const fetchUserInfoById = async (id) => {
        const res = await getRequest({
            endPoint: `/api/user?id=${id}`,
        });
        return res;
    };
    return {
        fetchUserInfoById,
    };
};
