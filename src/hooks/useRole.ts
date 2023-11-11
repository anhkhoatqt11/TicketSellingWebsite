import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useRole = () => {
  const fetchOrganizerRoleById = async (id) => {
    const res = await getRequest({endPoint: `/api/organizer/role?userId=${id}`})
    return res;
  }

  return {
    // fetchAllDoiTac,
    fetchOrganizerRoleById,
  };
};