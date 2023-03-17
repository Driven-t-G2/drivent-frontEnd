import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivityDate() {
  const token = useToken();

  const {
    data: activityDate,
    loading: activityDateLoading,
    error: activityDateError,
    act: getActivityDate,
  } = useAsync(() => activityApi.getDateInfo(token));

  return {
    activityDate,
    activityDateLoading,
    activityDateError,
    getActivityDate,
  };
}
