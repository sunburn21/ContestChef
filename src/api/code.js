import axios from './axios';

export const submitCode = async ({headers,bodydata}) => {
    console.log(bodydata);
    try {
        const { data } = await axios.post(
            `/ide/run`,{...bodydata},{headers:{...headers,"Accept": "application/json","Content-Type": "application/json"}} 
        );
        return data;
    } catch (error) {
      console.error(error); 
    }
}

export const getStatus = async ({headers,id}) =>{
    try {
        const { data } = await axios.get(
          `/ide/status?link=${id}`,{
              headers: {...headers,"Accept": "application/json"}
          } 
        );
        return data;
      } catch (error) {
        console.error(error);
      }
  }
  export const poll = async (para, ms)=> {
    let result = await getStatus(para);
    console.log(result);
    if(!result) return null;
    while (!result.result.data.output && !result.result.data.cmpinfo) {
      await wait(ms);
      result = await getStatus(para);
      if(!result) return null;
    }
    return result;
  }
  
  function wait(ms = 3000) {
    return new Promise(resolve => {
      console.log(`waiting ${ms} ms...`);
      setTimeout(resolve, ms);
    });
  }