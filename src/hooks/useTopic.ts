import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useTopic = () => {
  const fetchTopic = async () => {
    const res = await getRequest({endPoint: `/api/organizer/topic`})
    return res;
  }

  return {
    fetchTopic,
  };
};