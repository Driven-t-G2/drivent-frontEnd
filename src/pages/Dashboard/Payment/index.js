import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import instance from '../../../services/api';
import useToken from '../../../hooks/useToken';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const token = useToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const { enrollment } = useEnrollment();
  const [ticketTypes, setTicketTypes] = useState({});
  const [selectedModality, setSelectedModality] = useState('');
  const [haveHotel, setHaveHotel] = useState(undefined);

  useEffect(async() => {
    try {
      const res = await instance.get('/tickets/types', config);
      const ticketType = {};
      console.log(res.data);
      res.data.forEach((type) => {
        if (type.isRemote) ticketType.isRemote = type;
        if (type.includesHotel) ticketType.includesHotel = type;
        if (!type.isRemote && !type.includesHotel) ticketType.notIncludesHotel = type;
      });
      console.log(ticketType);
      setTicketTypes(ticketType);
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.status === 401) navigate('/sign-in');
    }
  }, []);

  function resetButtons() {
    setSelectedModality('');
    setHaveHotel(undefined);
  }

  const goToPayment = () => {

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
  console.log(ticketTypes);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      <ContainerTicket>
        <h5>Primeiro, escolha sua modalidade de ingresso</h5>
        {ticketTypes === {} ? (
          <span>Loading</span>
        ) : (
          <Modalidade>
            <Button
              onClick={() => (selectedModality === 'presencial' ? resetButtons() : setSelectedModality('presencial'))}
              isSelected={selectedModality === 'presencial'}
            >
              Presencial
              <p>R$ {ticketTypes?.notIncludesHotel?.price}</p>
            </Button>
            <Button
              onClick={() => (selectedModality === 'online' ? resetButtons() : setSelectedModality('online'))}
              isSelected={selectedModality === 'online'}
            >
              Online
              <p>R$ {ticketTypes?.isRemote?.price}</p>
            </Button>
          </Modalidade>
        )}
        {selectedModality === 'online' ? (
          <>
            <h5>
              Fechado! O total ficou em <Bold> R$ 100</Bold>. Agora é so confirmar
            </h5>

            <Reserve onClick={goToPayment}>RESERVAR INGRESSO</Reserve>
          </>
        ) : (
          ''
        )}
      </ContainerTicket>

      {selectedModality === 'presencial' ? (
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
                Fechado! O total ficou em <Bold>R$ {ticketTypes?.includesHotel?.price}</Bold>. Agora é so confirmar
              </h5>

              <Reserve onClick={goToPayment}>RESERVAR INGRESSO</Reserve>
            </>
          ) : (
            ''
          )}
          {haveHotel === false ? (
            <>
              <h5>
                Fechado! O total ficou em <Bold>R$ {ticketTypes?.notIncludesHotel?.price}</Bold>. Agora é so confirmar
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

const Reserve = styled.button`
  margin-top: 15px;
  border-style: none;
  border-radius: 10px;
  background-color: lightgray;

  width: 170px;
  height: 40px;

  font-weight: 400;
  font-size: 14px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;