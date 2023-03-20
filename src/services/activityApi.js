import api from './api';

export async function getDateInfo(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getLocal(token, dataId) {
  const response = await api.get(`/activities/${dataId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postChosenActivity(token, activityId) {
  try{
    const res = await api.post(`/activities/${activityId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 
    return res;
  }catch(error) {
    throw error;
  }
}

