import axios from './axios';

export const getContests = async ({headers}) => {
    try {
      const { data } = await axios.get(
        `/contests`,{
            headers: headers
        } 
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

export const getContestDetails = async ({headers,id}) => {
    try {
        const { data } = await axios.get(
          `/contests/${id}`,{
              headers: headers
          } 
        );
        return data;
      } catch (error) {
        console.error(error);
      }
}

export const getSubmissions = async ({headers,id}) =>{
    try {
        const { data } = await axios.get(
          `/submissions/?contestCode=${id}`,{
              headers: headers
          } 
        );
        return data;
      } catch (error) {
        console.error(error);
      }
}

export const getProblem = async ({headers,id,pid}) =>{
  try {
      const { data } = await axios.get(
        `/contests/${id}/problems/${pid}`,{
            headers: headers
        } 
      );
      return data;
    } catch (error) {
      console.error(error);
    }
}

export const getSubmissionsForProblem = async ({headers,id,pid}) =>{
  try {
      const { data } = await axios.get(
        `/submissions/?contestCode=${id}&problemCode=${pid}`,{
            headers: headers
        } 
      );
      return data;
    } catch (error) {
      console.error(error);
    }
}

export const getContestRankings = async ({headers,id}) => {
  try {
      const { data } = await axios.get(
        `/rankings/${id}`,{
            headers: headers
        } 
      );
      return data;
    } catch (error) {
      console.error(error);
    }
}
