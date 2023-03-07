export const getRandomAvatars = () => {
  /**
   * anonymous.png = 1RLekGHcNI7cVbRVyVNFi7RfSk5P_rTJA
   * anonymous2.png = 1FBCFafkLnLKPBpiqUxF0HAT_A8mty4My
   * anonymous3.png = 1SRgc_44r6yurrOC9nDkLVkkR5yyCrJU9
   * anonymous4.png = 14LoSDlG4eEPoYtH5QeC1lpwc-U7IHy5x
   */
  let avatars = [
    "1RLekGHcNI7cVbRVyVNFi7RfSk5P_rTJA",
    "1FBCFafkLnLKPBpiqUxF0HAT_A8mty4My",
    "1SRgc_44r6yurrOC9nDkLVkkR5yyCrJU9",
    "14LoSDlG4eEPoYtH5QeC1lpwc-U7IHy5x",
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};
