import { deleteRequest, getRequest, putRequest, postRequest } from "@/lib/fetch";

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

    const addBanner = async (data, id) => {
        const res = await postRequest({
            endPoint: `/api/admin/banners/add?id=${id}`,
            isFormData: false,
            formData: data,
        });
        console.log(res);
        return res;
    }

    const updateBanner = async (id, position) => {
        const res = await putRequest({
            endPoint: `/api/admin/banners/update?id=${id}`,
            isFormData: false,
            formData: position,
        });
        console.log(res);
        return res;
    }

    const deletedBanner = async (id) => {
        const res = await deleteRequest({
            endPoint: `/api/admin/banners/delete?id=${id}`,
        });
        console.log(res);
        return res;
    }

    const fetchEventOfOrganizerForBanner = async (name) => {
        const res = await getRequest({ endPoint: `/api/admin/banners/events?name=${name}` })
        return res;
    }

    const updateEvent = async (data, id) => {
        const res = await postRequest({
            endPoint: `/api/admin/event/update?id=${id}`,
            isFormData: false,
            formData: data,
        });
        console.log(res);
        return res;
    }

    return {
        fetchTotalInfo,
        fetchAllUser,
        fetchAllBanner,
        addBanner,
        updateBanner,
        deletedBanner,
        fetchEventOfOrganizerForBanner,
        updateEvent,
    };
};
