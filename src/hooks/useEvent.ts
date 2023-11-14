import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useEvent = () => {
  const fetchEventById = async (id) => {
    const res = await getRequest({
      endPoint: `/api/event/event-detail?id=${id}`,
    });
    return res;
  };
  const fetchAllEvents = async (props = {}) => {
    let endPointUrl = `/api/event?limit=20`;
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };
  return {
    fetchEventById,
    fetchAllEvents,
  };
};
