import api from './api';

export async function getHotelsInfo(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
export async function getHotelsInfoRooms(token, id) {
  const response = await api.get('/hotels/' + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
