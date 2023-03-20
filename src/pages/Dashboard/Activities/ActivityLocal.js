import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getLocal, postChosenActivity } from '../../../services/activityApi';
import { IoEnterOutline, IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

export default function ActivityLocal({ dataId }) {
  const token = useToken();

  const [activityLocal, setActivityLocal] = useState([]);

  useEffect(getActivities, [dataId]);

  async function getActivities() {
    const res = await getLocal(token, dataId);
    console.log(res);
    setActivityLocal(res);
  }

  async function postActivity(activityId) {
    try {
      await postChosenActivity(token, activityId);
      toast('Inscrição realizada com sucesso!');
      getActivities();
    } catch (error) {
      if (error.response.data.message === 'Activities hours Dont match') {
        toast('Conflito de horário.');
      } else {
        toast('Não foi possível fazer a inscrição.');
      }
    }
  }

  return (
    <ActivitiesContainer>
      {activityLocal?.map((i) => (
        <div key={'activity-local-' + i.id}>
          <h2>{i.name}</h2>
          <LocalContainer size={activityLocal.length}>
            {i.activities.map((j) => (
              <ActivityBox key={'activity-box-' + j.id} size={j.duration} subscribed={j.subscribed}>
                <Title>
                  <h3>{j.name}</h3>
                  <span>
                    {dayjs(j.start_time).format('HH:mm')} - {dayjs(j.end_time).format('HH:mm')}
                  </span>
                </Title>
                <ButtonBox>
                  {j.subscribed ? (
                    <>
                      <h6>
                        <IoCheckmarkCircleOutline />
                      </h6>
                      inscrito
                    </>
                  ) : j.capacity - j._count.Chosen_Activities === 0 ? (
                    <>
                      <h5>
                        <IoCloseCircleOutline />
                      </h5>
                      <h4>Esgotado</h4>
                    </>
                  ) : (
                    <>
                      <h6>
                        <IoEnterOutline onClick={() => postActivity(j.id)} />
                      </h6>
                      {j.capacity - j._count.Chosen_Activities} vagas
                    </>
                  )}
                </ButtonBox>
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
  align-items: center;
  justify-content: flex-start;

  border: 1px solid #d7d7d7;
  width: ${({ size }) => 70 / size}vw;
  height: 400px;
  padding: 5px;
`;

const ActivityBox = styled.div`
  display: flex;
  width: 100%;
  height: ${({ size }) => size * 79}px;
  background-color: ${({ subscribed }) => (subscribed ? '#D0FFDB' : '#f1f1f1')};
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: #343434;
  font-size: 12px;
  line-height: 14px;
  height: 100%;
  width: 75%;
  border-right: 1px solid #cfcfcf;

  h3 {
    font-weight: 700;
  }
`;

const ButtonBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25%;
  font-size: 9px;
  line-height: 11px;
  color: #078632;
  margin: 0 5px;
  h6 {
    font-size: 25px;
    cursor: pointer;
  }

  h5 {
    color: #cc6666;
    font-size: 25px;
  }

  h4 {
    color: #cc6666;
  }
`;
