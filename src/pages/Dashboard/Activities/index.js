import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useState } from 'react';
import styled from 'styled-components';
import useActivityDate from '../../../hooks/api/useActivityDate';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  });

  const { activityDate } = useActivityDate();
  const { ticket } = useTicket();

  const [selectedDateId, setSelectedDateId] = useState(0);

  function selectDate(id) {
    if (selectedDateId === id) {
      setSelectedDateId(0);
    } else {
      setSelectedDateId(id);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      {ticket?.status !== 'PAID' ? (
        <ContainerWarning>
          <h5>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</h5>
        </ContainerWarning>
      ) : ticket.TicketType.isRemote ? (
        <ContainerWarning>
          <h5>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</h5>
        </ContainerWarning>
      ) : (
        <ListDate>
          {activityDate?.map((date) => (
            <Date onClick={() => selectDate(date.id)} key={date.id} isSelected={selectedDateId === date.id}>
              {dayjs(date.data).format('dddd') + ', ' + dayjs(date.data).format('DD/MM')}
            </Date>
          ))}
        </ListDate>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const ContainerWarning = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    text-align: center;
    width: 30rem;
    height: 2.5rem;
    font-size: 20px;
    color: #8e8e8e;
  }
`;

const ListDate = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Date = styled.li`
  background: ${({ isSelected }) => (isSelected ? '#FFD37D' : '#e0e0e0')};
  width: 131px;
  height: 37px;
  margin-right: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
