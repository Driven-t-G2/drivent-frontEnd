import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
    <ActivitiesContainer>
      {activityLocal?.map((i) => (
        <div>
          <h2>{i.name}</h2>
          <LocalContainer>
            {i.activities.map((j) => (
              <ActivityBox>
                <Title>
                  <h3>{j.name}</h3>
                  <span>
                    {dayjs(j.start_time).format('HH:MM')} - {dayjs(j.end_time).format('HH:MM')}
                  </span>
                </Title>
                {j.capacity}
              </ActivityBox>
            ))}
          </LocalContainer>
        </div>
      ))}
    </ActivitiesContainer>
  );
}

const ActivitiesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  h2 {
    color: #7b7b7b;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
  }
`;

const LocalContainer = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #d7d7d7;
  width: 100%;
  height: 400px;
  padding: 5px;
`;

const ActivityBox = styled.div`
  display: flex;
  width: 240px;
  height: 79px;
  background: #f1f1f1;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: #343434;
  font-size: 12px;
  line-height: 14px;
  width: 75%;
  border-right: 1px solid #cfcfcf;

  h3 {
    font-weight: 700;
  }
`;
