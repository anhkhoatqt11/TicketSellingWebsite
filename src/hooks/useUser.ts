import { getRequest } from "@/lib/fetch";

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
