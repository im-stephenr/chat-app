import axios from "axios";
import { getRandomAvatars } from "../assets/components/utils/getRandomAvatars";
import { getUserIpAdd } from "../assets/components/utils/getUserIpAdd";

export const useSaveUser = async (loginName) => {
  const ip = await getUserIpAdd();

  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URL}/users/register`,
    { userName: loginName, avatar: getRandomAvatars(), ip: ip, status: 1 }
  );

  return response;
};
