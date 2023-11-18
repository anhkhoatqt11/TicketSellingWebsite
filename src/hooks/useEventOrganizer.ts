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
    return res;
  };


  const fetchEventById = async (eventId) => {
    const res = await getRequest({endPoint: `/api/organizer/event/user-event/detail?eventId=${eventId}`})
    return res;
  }

  const fetchEventAngGuestListById = async (eventId) => {
    const res = await getRequest({endPoint: `/api/organizer/event/user-event/guest-list?eventId=${eventId}`})
    return res;
  }

  const fetchEventAndCouponListById = async (eventId) => {
    const res = await getRequest({endPoint: `/api/organizer/event/user-event/coupon?eventId=${eventId}`})
    return res;
  }

  const editEvent = async (data) => {
    const res = await postRequest({
      endPoint: '/api/organizer/event/user-event/edit',
      isFormData: false,
      formData: data,
    });
  };

  const fetchSummary = async (eventId) => {
    const res = await getRequest({endPoint: `/api/organizer/event/user-event/summary?eventId=${eventId}`})
    return res;
  }

  return {
    // fetchAllDoiTac,
    fetchEventOfOrganizer,
    createNewEvent,
    fetchEventById,
    fetchEventAngGuestListById,
    fetchEventAndCouponListById,
    editEvent,
    fetchSummary
  };
};