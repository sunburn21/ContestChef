import store from 'store2';

export default async () => {
  const token = await store.get('authToken');
  if(token){
    return {
      Authorization: `Bearer ${token}`
    }
  }else{
    return null;
  }
  };
