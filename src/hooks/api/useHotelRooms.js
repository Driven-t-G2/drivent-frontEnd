import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelRooms(id) {
  const token = useToken();

  const {
    data: hotelsRooms,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotelsRooms,
  } = useAsync(() => hotelApi.getHotelsInfoRooms(token, id));

  return {
    hotelsRooms,
    hotelsLoading,
    hotelsError,
    getHotelsRooms,
  };
}
