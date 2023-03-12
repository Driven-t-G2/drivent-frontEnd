import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';
import HotelButton from './HotelButton';
import { useEffect, useState } from 'react';
import RoomButton from './RoomButton';
import useToken from '../../../hooks/useToken';
import instance from '../../../services/api';
import { Reserve } from '../Payment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Hotel() {
  const token = useToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();

  const [hotelId, setHotelId] = useState(0);
  const [hotelSelect, setSelectHotel] = useState(false);
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [booking, setBooking] = useState({});

  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();
  const { hotels } = useHotel();

  useEffect(async() => {
    if (hotelSelect) {
      try {
        const res = await instance.get(`/hotels/${hotelId}`, config);
        setHotelsWithRooms(res.data.Rooms);
      } catch (err) {
        console.log(err);
      }
    }
  }, [hotelId]);

  async function bookRoom() {
    try {
      await instance.post('/booking', { roomId: selectedRoomId }, config);
      toast('Quarto reservado com sucesso!');
      const res = await instance.get('/booking', config);
      const booking = res.data;   
      navigate('/dashboard/booking', { state: { booking } });
    } catch (err) {
      console.log(err.data);
    }
  }

  useEffect(async() => {
    try {
      const res = await instance.get('/booking', config);
      setBooking(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
  } else if (booking.Room) {
    navigate('/dashboard/booking', { state: { booking } });
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <ContainerTicket>
        <h5>Primeiro, escolha seu hotel</h5>
      </ContainerTicket>
      <Modalidade>
        {hotels?.map((item) => (
          <HotelButton
            key={item.id}
            hotel={item}
            set={setHotelId}
            id={hotelId}
            setHotel={setSelectHotel}
            hotelSelect={hotelSelect}
            setSelectedRoomId={setSelectedRoomId}
          />
        ))}
      </Modalidade>

      {hotelSelect ? (
        <>
          <ContainerTicket>
            <h5>Ótimo pedido! Agora escolha seu quarto</h5>
          </ContainerTicket>
          <Rooms>
            {hotelsWithRooms.map((room) => (
              <RoomButton
                key={room.id}
                name={room.name}
                capacity={room.capacity}
                booking={room.Booking}
                id={room.id}
                setSelectedRoomId={setSelectedRoomId}
                selectedRoomId={selectedRoomId}
              />
            ))}
          </Rooms>
        </>
      ) : (
        ''
      )}

      {selectedRoomId !== 0 ? <Reserve onClick={bookRoom}>RESERVAR QUARTO</Reserve> : ''}
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
  overflow-x: auto;

  padding-bottom: 15px;
`;
const Rooms = styled.aside`
  margin-top: 33px;
  display: flex;
  flex-wrap: wrap;
`;
