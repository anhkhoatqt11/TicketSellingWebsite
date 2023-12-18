import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useVoucher = () => {

  const creatNewVoucher = async (data) => {
    const res = await postRequest({
      endPoint: '/api/organizer/event/user-event/coupon/add',
      isFormData: false,
      formData: data,
    });
    return res;
  };


  const editVoucher = async (data) => {
    const res = await postRequest({
      endPoint: '/api/organizer/event/user-event/coupon/edit',
      isFormData: false,
      formData: data,
    });
  };

  

  return {
    // fetchAllDoiTac,
    creatNewVoucher,
    editVoucher
  };
};