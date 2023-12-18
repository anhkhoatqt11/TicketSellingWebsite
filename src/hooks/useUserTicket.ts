import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useTicket = () => {
  const fetchTicketById = async (id) => {
    const res = await getRequest({
      endPoint: `/api/user-ticket?id=${id}`,
    });
    return res;
  };

  return {
    fetchTicketById,
  };
};
