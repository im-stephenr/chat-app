export const getRandomAvatars = () => {
  let avatars = [
    "anonymous.png",
    "anonymous2.png",
    "anonymous3.png",
    "anonymous4.png",
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};
