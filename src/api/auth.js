import axios from './axios';
import getAuthHeader from './getAuthHeader';
// const client_secret =  'b2503a44eafe436b30a9e3fb00b10aaa'
export const getCurrentUser = async () => {
  try {
    const accesstoken = await getAuthHeader();
    const data = { headers: accesstoken };
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async ({authcode,client_id,client_secret,redirect_uri}) => {
  try {
    const response = await axios.post(
      "oauth/token",
      {"grant_type": "authorization_code",
      "code": authcode,
      "client_id":client_id,
      "client_secret":client_secret,
      "redirect_uri":redirect_uri},
    );
    return { success: true,response };
  } catch (error) {
    return error;
  }
};
