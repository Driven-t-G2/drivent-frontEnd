import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';
import HotelButton from './HotelButton';

export default function Hotel() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();
  const { hotels } = useHotel();
  console.log(hotels);
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
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <ContainerTicket>
        <h5>Primeiro, escolha seu hotel</h5>
      </ContainerTicket>
      <Modalidade>
        {hotels?.map((item) => (
          <HotelButton hotel={item} />
        ))}
      </Modalidade>
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
const ContainerTicket = styled.div`
  width: 100%;
  margin-top: 40px;
  h5 {
    color: #8e8e8e;
  }
`;
const Modalidade = styled.div`
  margin-top: 20px;
  display: flex;
  color: #8e8e8e;

  padding-bottom: 15px;
`;
