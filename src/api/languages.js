import axios from './axios';

export const getLanguages = async ({headers}) => {
    try {
      const { data } = await axios.get(
        `/language`,{
            headers: headers
        } 
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };