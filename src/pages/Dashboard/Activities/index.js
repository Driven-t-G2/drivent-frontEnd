import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useActivityDate from '../../../hooks/api/useActivityDate';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { activityDate } = useActivityDate();
  const { ticket } = useTicket();

  console.log(activityDate);

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
        'oi'
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
