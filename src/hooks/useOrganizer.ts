import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useOrganizer = () => {
  const fetchTotalInfo = async () => {
    const res = await getRequest({
        endPoint: `/api/organizer/dashboard`,
    });
    return res;
  }

  const fetchOrganizerById = async (id) => {
    const res = await getRequest({endPoint: `/api/organizer/organizer-information?userId=${id}`})
    return res;
  }

  const uploadOrganizerInfo = async (data) => {
    try {
      const res = await postRequest({
        endPoint: '/api/organizer/update-information',
        isFormData: false,
        formData: data,
      })
      toast.success('Thông tin hồ sơ đã được lưu')
    } catch (e) {
      console.log(e);
    }
  }

  return {
    // fetchAllDoiTac,
    fetchTotalInfo,
    fetchOrganizerById,
    uploadOrganizerInfo
  };
};