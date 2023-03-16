import api from './api';

export async function getDateInfo(token) {
  const response = await api.get('/activities/date', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
