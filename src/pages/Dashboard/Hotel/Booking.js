import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Reserve } from '../Payment';

export default function Booking({ setChange, selectedHotel, hotelsWithRooms, room }) {
  const capacity = { 1: 'Single', 2: 'Double', 3: 'Triple' };
  const [reservations, setReservations] = useState(0);

  useEffect(() => {
    reservationsRooms();
  }, []);

  const { Rooms } = hotelsWithRooms;
  const { image, name } = selectedHotel;

  function reservationsRooms() {
    const roomBooking = Rooms?.find(({ name: roomName }) => roomName === room.name);
    if (roomBooking) {
      setReservations(roomBooking?.Booking.length);
    }
  }

  function changeRoom() {
    setChange(true);
  }

  function capacityRoom() {
    return (room?.capacity && capacity[room.capacity]) || '-';
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <ContainerTicket>
        <h5>Você já escolheu seu quarto:</h5>
      </ContainerTicket>
      <HotelButton>
        <HotelImage>
          <img src={image} alt={'hotel'} />
          <h2>{name}</h2>
        </HotelImage>
        <HotelData>
          <h5>Quarto reservado:</h5>
          <p>
            {room.name} ({capacityRoom()})
          </p>
        </HotelData>
        <HotelData>
          <h5>Pessoas no seu quarto:</h5>   
          <p>{(reservations === 1) ? 'Somente você' : `Você e mais ${reservations - 1}`}</p>
        </HotelData>
      </HotelButton>
      <Reserve onClick={changeRoom}>TROCAR DE QUARTO</Reserve>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const HotelButton = styled.button`
  background-color: #ffeed2;
  width: 196px;
  height: 264px;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border: 1px solid #cecece;
  border-radius: 20px;
  font-size: 16px;
  display: flex;
  gap: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    color: #3c3c3c;
    font-size: 12px;
    font-weight: 400;
  }
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  h5 {
    font-weight: 700;
    font-size: 12px;
  }
  h2 {
    color: #343434;
    font-weight: 400;
    font-size: 20px;
  }
`;
const HotelData = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 170px;
  margin-top: 10px;
`;
const HotelImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const ContainerTicket = styled.div`
  width: 100%;
  margin-top: 40px;
  h5 {
    color: #8e8e8e;
  }
`;
