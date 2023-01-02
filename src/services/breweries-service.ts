import axios from 'axios';
import httpStatus from 'http-status';

const getData = async (url: string) => {
  try {
    const { data } = await axios.get(url);

    return data;
  } catch {
    throw httpStatus.INTERNAL_SERVER_ERROR;
  }
};

export const breweriesService = {
  getData,
};
