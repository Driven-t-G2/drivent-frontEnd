import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function Hotel() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();
  let ticketType;
  if (ticket) {
    ticketType = ticket.TicketType;
  }
  if (!enrollment) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <ContainerWarning>
          <h5>Você precisa completar sua inscrição antes de prosseguir pra escolha de hotel</h5>
        </ContainerWarning>
      </>
    );
  } else if (!ticket) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <ContainerWarning>
          <h5>Você precisa completar seu ticket antes de prosseguir pra escolha de hotel</h5>
        </ContainerWarning>
      </>
    );
  } else if (ticket.status !== 'PAID') {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <ContainerWarning>
          <h5>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h5>
        </ContainerWarning>
      </>
    );
  } else if (!ticketType.includesHotel) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <ContainerWarning>
          <h5>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</h5>
        </ContainerWarning>
      </>
    );
  }
  return 'Hotel: Em breve!';
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
