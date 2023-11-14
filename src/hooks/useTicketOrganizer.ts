import { deleteRequest, getRequest, postRequest } from '@/lib/fetch';
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

  const editTicket = async (data) => {
    const res = await postRequest({
      endPoint: '/api/organizer/event/user-event/edit/edit-ticket',
      isFormData: false,
      formData: data,
    });
  };

  const deleteTicket = async (id) => {
    const res = await deleteRequest({
      endPoint: `/api/organizer/event/user-event/edit/delete-ticket?id=${id}`,
    });
    console.log(res);
    return res;
  };

  return {
    createNewTicket,
    editTicket,
    deleteTicket
  };
};