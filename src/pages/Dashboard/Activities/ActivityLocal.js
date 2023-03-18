import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getLocal } from '../../../services/activityApi';

export default function ActivityLocal({ dataId }) {
  const token = useToken();

  const [activityLocal, setActivityLocal] = useState([]);

  useEffect(async() => {
    const res = await getLocal(token, dataId);
    setActivityLocal(res);
  }, [dataId]);

  return (
    <>
      {activityLocal?.map((i) => (
        <>
          {i.name}:
          {i.activities.map((i) => (
            <>{i.name}</>
          ))}
        </>
      ))}
    </>
  );
}
