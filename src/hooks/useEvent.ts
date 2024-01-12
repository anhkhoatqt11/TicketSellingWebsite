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
    let endPointUrl = `/api/event?page=1&limit=20`;
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };
  const fetchSuggestion = async () => {
    let endPointUrl = `/api/event/suggestion`;
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };
  const fetchAllEventsBySearch = async (page, props = {}) => {
    let endPointUrl = `/api/event?page=${page}&limit=12`;
    const appendParam = (param, value) => {
      if (value !== "" && typeof value !== "undefined") {
        endPointUrl += `&${param}=${value}`;
      }
    };
    Object.keys(props).forEach((prop) => {
      appendParam(prop, props[prop]);
    });
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };
  const fetchEventBanner = async () => {
    const res = await getRequest({ endPoint: `/api/event/event-banners` });
    return res;
  };
  return {
    fetchEventById,
    fetchSuggestion,
    fetchAllEvents,
    fetchAllEventsBySearch,
    fetchEventBanner,
  };
};
