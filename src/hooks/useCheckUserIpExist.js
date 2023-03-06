export const useCheckUserIpExist = async (ip) => {
  const response = await fetch(`http://localhost:3000/users?ip=${ip}`);
  const data = await response.json();
  return data;
};
