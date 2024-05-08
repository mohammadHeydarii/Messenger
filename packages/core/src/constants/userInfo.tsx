import { useGetUserGetUserProfile } from '../services';

export const userInfo = () => {
  const { data } = useGetUserGetUserProfile();

  return {
    name: data?.data?.nameAndFamily,
    userName: data?.data?.userName,
  };
};
