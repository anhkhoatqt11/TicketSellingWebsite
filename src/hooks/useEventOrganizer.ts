import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useEventOrganizer = () => {
  const fetchEventOfOrganizer = async (name,page) => {
    const res = await getRequest({endPoint: `/api/organizer/event/user-event?name=${name}&page=${page}&limit=2`})
    return res;
  }

  return {
    // fetchAllDoiTac,
    fetchEventOfOrganizer
  };
};