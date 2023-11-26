import { getRequest } from "@/lib/fetch";

export const useAdmin = () => {

    // const fetchTotalEvent = async () => {
    //     const res = await getRequest({
    //         endPoint: `/api/admin/event/total-event`,
    //     });
    //     console.log(res);
    //     return res;
    // };

    // const fetchTotalUser = async () => {
    //     const res = await getRequest({
    //         endPoint: `/api/admin/user/total-user`,
    //     });
    //     console.log(res);
    //     return res;
    // };

    const fetchTotalInfo = async () => {
        const res = await getRequest({
            endPoint: `/api/admin/dashboard`,
        });
        console.log(res);
        return res;
    }


    return {
        fetchTotalInfo
    };
};
