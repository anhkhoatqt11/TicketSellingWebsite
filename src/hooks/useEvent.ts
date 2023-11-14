import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useEvent = () => {
    const fetchEventById = async (id) => {
        const res = await getRequest({endPoint: `/api/event/event-detail?id=${id}`})
        return res;
    }


    return {
        fetchEventById,
    }
}