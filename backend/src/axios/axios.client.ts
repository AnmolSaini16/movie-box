import axios from "axios";
const token = process.env.TMBD_API_TOKEN;

const get = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

export default { get };
