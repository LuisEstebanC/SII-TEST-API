const generateUniqueId = () => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base 36
  const randomNum = Math.random().toString(36).substring(2, 8); // Generate a random string
  return `${timestamp}-${randomNum}`; // Combine both parts
};
export default generateUniqueId;
