import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import instance from '../../../services/api';
import useToken from '../../../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';

export default function Payment() {
  const navigate = useNavigate();
  const token = useToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const { enrollment } = useEnrollment();
  const [ticketTypes, setTicketTypes] = useState({});
  const [selectedModality, setSelectedModality] = useState('');
  const [haveHotel, setHaveHotel] = useState(undefined);
  const [reserved, setReserved] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketTypeId, setTicketTypeId] = useState(0);
  const [ticketId, setTicketId] = useState(0);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (selectedModality === 'Online') {
      setTotalPrice(ticketTypes?.isRemote?.price);
      setTicketTypeId(ticketTypes?.isRemote?.id);
    } else if (selectedModality === 'Presencial' && haveHotel) {
      setTotalPrice(ticketTypes?.includesHotel?.price);
      setTicketTypeId(ticketTypes?.includesHotel?.id);
    } else if (selectedModality === 'Presencial' && !haveHotel) {
      setTotalPrice(ticketTypes?.notIncludesHotel?.price);
      setTicketTypeId(ticketTypes?.notIncludesHotel?.id);
    }
  }, [selectedModality, haveHotel]);

  useEffect(async() => {
    try {
      const ticket = await instance.get('/tickets', config);
      if (ticket) {
        setTotalPrice(ticket.data.TicketType.price);
        setTicketId(ticket.data.id);
        setReserved(true);
        const payment = await instance.get(`/payments?ticketId=${ticket.data.id}`, config);
        if (payment) {
          setPaid(true);
          setReserved(true);
        }
      }
    } catch (err) {
      toast(err.response.data.message);
      if (err.response.status === 401) navigate('/sign-in');
    }
  }, []);

  useEffect(async() => {
    try {
      const res = await instance.get('/tickets/types', config);
      const ticketType = {};
      res.data.forEach((type) => {
        if (type.isRemote) ticketType.isRemote = type;
        if (type.includesHotel) ticketType.includesHotel = type;
        if (!type.isRemote && !type.includesHotel) ticketType.notIncludesHotel = type;
      });
      setTicketTypes(ticketType);
    } catch (err) {
      toast(err.response.data.message);
      if (err.response.status === 401) navigate('/sign-in');
    }
  }, []);

  function resetButtons() {
    setSelectedModality('');
    setHaveHotel(undefined);
  }

  const goToPayment = async() => {
    try {
      const res = await instance.post('/tickets', { ticketTypeId }, config);
      setTicketId(res.data.id);
    } catch (err) {
      toast(err.response.data.message);
      if (err.response.status === 401) navigate('/sign-in');
    }

    setReserved(true);
  };
  if (!enrollment) {
    return (
      <>
        <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
        <ContainerWarning>
          <h5>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h5>
        </ContainerWarning>
      </>
    );
  }
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {reserved ? (
        <ContainerTicket>
          <h5>Ingresso escolhido</h5>
          <TicketBox>
            <p>
              {selectedModality} + {haveHotel ? <>Com Hotel</> : <>Sem Hotel</>}
            </p>
            <span>R$ {totalPrice}</span>
          </TicketBox>

          {paid ? (
            <>
              <h5>Pagamento</h5>
              <Done>
                <FaCheckCircle />
                <DoneText>
                  <h3>Pagamento confirmado!</h3>
                  <h4>Prossiga para escolha de hospedagem e atividades</h4>
                </DoneText>
              </Done>
            </>
          ) : (
            <PaymentForm setPaid={setPaid} ticketId={ticketId} />
          )}
        </ContainerTicket>
      ) : (
        <>
          <ContainerTicket>
            <h5>Primeiro, escolha sua modalidade de ingresso</h5>
            {ticketTypes === {} ? (
              <span>Loading</span>
            ) : (
              <Modalidade>
                {ticketTypeId}
                <Button
                  onClick={() =>
                    selectedModality === 'Presencial' ? resetButtons() : setSelectedModality('Presencial')
                  }
                  isSelected={selectedModality === 'Presencial'}
                >
                  Presencial
                  <p>R$ {ticketTypes?.notIncludesHotel?.price}</p>
                </Button>
                <Button
                  onClick={() => (selectedModality === 'Online' ? resetButtons() : setSelectedModality('Online'))}
                  isSelected={selectedModality === 'Online'}
                >
                  Online
                  <p>R$ {ticketTypes?.isRemote?.price}</p>
                </Button>
              </Modalidade>
            )}
            {selectedModality === 'Online' ? (
              <>
                <h5>
                  Fechado! O total ficou em <Bold> R$ {totalPrice}</Bold>. Agora é so confirmar
                </h5>

                <Reserve onClick={goToPayment}>RESERVAR INGRESSO</Reserve>
              </>
            ) : (
              ''
            )}
          </ContainerTicket>

          {selectedModality === 'Presencial' ? (
            <ContainerTicket>
              <h5>Ótimo! Agora escolha sua modalidade de hospedagem</h5>
              <Modalidade>
                <Button onClick={() => setHaveHotel(false)} isSelected={haveHotel === false}>
                  Sem Hotel
                  <p>+ R$ 0</p>
                </Button>
                <Button onClick={() => setHaveHotel(true)} isSelected={haveHotel}>
                  Com Hotel
                  <p>+ R$ {ticketTypes?.includesHotel?.price - ticketTypes?.notIncludesHotel?.price}</p>
                </Button>
              </Modalidade>
              {haveHotel === true ? (
                <>
                  <h5>
                    Fechado! O total ficou em <Bold>R$ {totalPrice}</Bold>. Agora é so confirmar
                  </h5>

                  <Reserve onClick={goToPayment}>RESERVAR INGRESSO</Reserve>
                </>
              ) : (
                ''
              )}
              {haveHotel === false ? (
                <>
                  <h5>
                    Fechado! O total ficou em <Bold>R$ {totalPrice}</Bold>. Agora é so confirmar
                  </h5>

                  <Reserve onClick={goToPayment}>RESERVAR INGRESSO</Reserve>
                </>
              ) : (
                ''
              )}
            </ContainerTicket>
          ) : (
            ''
          )}
        </>
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

  padding-bottom: 33px;
`;
const Button = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? '#FFEED2' : '#FFF')};
  width: 145px;
  height: 145px;
  margin-right: 1rem;
  border: ${({ isSelected }) => (isSelected ? 'none' : '1px solid #cecece')};
  border-radius: 20px;
  /* background-color: ${(prop) => (prop.clicked ? 'transparent' : '#FFEED2')}; */
  cursor: pointer;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    color: #cecece;
    font-size: 14px;
    padding-top: 3px;
  }
`;
const Bold = styled.span`
  font-weight: 550;
`;

export const Reserve = styled.button`
  border-style: none;
  border-radius: 10px;
  background-color: lightgray;

  width: 170px;
  height: 40px;

  cursor: pointer;

  font-weight: 400;
  font-size: 14px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;

const TicketBox = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 108px;
  background: #ffeed2;
  border-radius: 20px;
  font-weight: 400;
  text-align: center;

  p {
    color: #454545;
    font-size: 16px;
    line-height: 19px;
  }

  span {
    font-size: 14px;
    line-height: 16px;
    color: #898989;
  }
`;

const DoneText = styled.div`
  font-size: 16px;
  line-height: 19px;

  color: #454545;
  h3 {
    font-weight: 700;
  }
  h4 {
    font-weight: 400;
  }
`;

const Done = styled.div`
  display: flex;
  font-size: 55px;
  width: 366px;
  height: 38px;
  align-items: center;
  color: #36b853;
  gap: 10px;
  margin: 30px 0;
`;
