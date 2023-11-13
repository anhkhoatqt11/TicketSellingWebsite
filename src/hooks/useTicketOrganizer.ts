import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useTicketOrganizer = () => {
  // const fetchEventOfOrganizer = async (name,page,userId) => {
  //   const res = await getRequest({endPoint: `/api/organizer/event/user-event?name=${name}&page=${page}&limit=2&userId=${userId}`})
  //   return res;
  // }
  const createNewTicket = async (data) => {
    const res = await postRequest({
      endPoint: '/api/organizer/event/add/add-ticket',
      isFormData: false,
      formData: data,
    });
  };

  return {
    createNewTicket,
  };
};