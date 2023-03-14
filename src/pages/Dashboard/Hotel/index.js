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
import Booking from './Booking';

export default function Hotel() {
  const token = useToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [hotelId, setHotelId] = useState(0);
  const [hotelSelect, setSelectHotel] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [booking, setBooking] = useState({});
  const [change, setChange] = useState(false);

  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();
  const { hotels } = useHotel();

  async function selectRoom() {
    try {
      const res = await instance.get('/booking', config);
      setBooking(res.data);
      const res2 = await instance.get(`/hotels/${res.data.Room.hotelId}`, config);
      setRoom(res2.data.Rooms.find((i) => i.id === res.data.Room.id));
      console.log('ola');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    selectRoom();
  }, []);

  useEffect(() => {
    async function fetchHotelsWithRooms() {
      if (hotelSelect) {
        try {
          const res = await instance.get(`/hotels/${hotelId}`, config);
          setRooms(res.data.Rooms);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchHotelsWithRooms();
  }, [hotelId, hotelSelect]);

  async function bookRoom() {
    const id = booking.id;
    try {
      if (id) {
        await instance.put(`/booking/${id}`, { roomId: selectedRoomId }, config);
      } else {
        await instance.post('/booking', { roomId: selectedRoomId }, config);
      }
      toast('Quarto reservado com sucesso!');
      selectRoom();
      setChange(false);
    } catch (err) {
      console.log(err.data);
    }
  }

  let ticketType;
  if (ticket) {
    ticketType = ticket.TicketType;
  }
  if (!change && booking.Room) {
    return <Booking setChange={setChange} change={change} config={config} room={room} booking={booking} />;
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {!enrollment ? (
        <ContainerWarning>
          <h5>Você precisa completar sua inscrição antes de prosseguir pra escolha de hotel</h5>
        </ContainerWarning>
      ) : !ticket ? (
        <ContainerWarning>
          <h5>Você precisa completar seu ticket antes de prosseguir pra escolha de hotel</h5>
        </ContainerWarning>
      ) : ticket.status !== 'PAID' ? (
        <ContainerWarning>
          <h5>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h5>
        </ContainerWarning>
      ) : !ticketType.includesHotel ? (
        <ContainerWarning>
          <h5>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</h5>
        </ContainerWarning>
      ) : (
        <ContainerTicket>
          <h5>Primeiro, escolha seu hotel</h5>
        </ContainerTicket>
      )}

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
            {rooms.map((room) => (
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
