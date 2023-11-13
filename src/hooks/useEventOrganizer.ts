import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useEventOrganizer = () => {
  const fetchEventOfOrganizer = async (name,page,userId) => {
    const res = await getRequest({endPoint: `/api/organizer/event/user-event?name=${name}&page=${page}&limit=2&userId=${userId}`})
    return res;
  }
  const createNewEvent = async (data) => {
    const res = await postRequest({
      endPoint: '/api/organizer/event/add',
      isFormData: false,
      formData: data,
    });
  };

  const fetchJustCreatedEvent = async (userId) => {
    const res = await getRequest({endPoint: `/api/organizer/event/add/get-newest?userId=${userId}`})
    return res;
  }

  return {
    // fetchAllDoiTac,
    fetchEventOfOrganizer,
    createNewEvent,
    fetchJustCreatedEvent
  };
};