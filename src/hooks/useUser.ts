import { getRequest } from "@/lib/fetch";

export const useUser = () => {
    const fetchUserInfoById = async (id) => {
        const res = await getRequest({
            endPoint: `/api/user?id=${id}`,
        });
        console.log(res);
        return res;
    };
    return {
        fetchUserInfoById,
    };
};
