import { getRequest } from "@/lib/fetch";

export const useAdmin = () => {

    const fetchTotalInfo = async () => {
        const res = await getRequest({
            endPoint: `/api/admin/dashboard`,
        });
        console.log(res);
        return res;
    }

    const fetchAllUser = async (name, page) => {
        const res = await getRequest({
            endPoint: `/api/admin/users?name=${name}&page=${page}&limit=10`,
        });
        console.log(res);
        return res;
    } 

    const fetchAllBanner = async () => {
        const res = await getRequest({
            endPoint: `/api/admin/banners`,
        });
        console.log(res);
        return res;
    }

    return {
        fetchTotalInfo,
        fetchAllUser,
        fetchAllBanner,
    };
};
