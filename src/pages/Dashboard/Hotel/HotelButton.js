import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useHotelRooms from '../../../hooks/api/useHotelRooms';

const HotelButton = ({ hotel, set, id, setHotel, hotelSelect }) => {
  const { hotelsRooms } = useHotelRooms(hotel.id);
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    const CalcCapacity = (array) => {
      let hotelCapacity = 0;
      for (let i = 0; i < array.length; i++) {
        const element = array[i].capacity - array[i].Booking.length;
        hotelCapacity = hotelCapacity + element;
      }
      setCapacity(hotelCapacity);
    };
    if (hotelsRooms) {
      CalcCapacity(hotelsRooms?.Rooms);
    }
  }, [hotelsRooms]);

  const ClickHotel = () => {
    if (hotel.id === id) {
      set(0);
      setHotel(false);
    } else {
      set(hotel.id);
      setHotel(true);
    }
  };

  return (
    <>
      <Hotelbutton onClick={ClickHotel} isSelected={hotel.id === id}>
        <HotelImage>
          <img src={hotel.image}></img>
          <h2>{hotel.name}</h2>
        </HotelImage>

        <HotelData>
          <h5>Tipos de acomodação:</h5>
          <p>Single e Double</p>
        </HotelData>
        <HotelData>
          <h5>Vagas disponíveis:</h5>
          <p>{capacity}</p>
        </HotelData>
      </Hotelbutton>
    </>
  );
};

export default HotelButton;

const Hotelbutton = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? '#FFEED2' : '#EBEBEB')};
  width: 196px;
  height: 264px;
  margin-right: 1rem;
  border: ${({ isSelected }) => (isSelected ? 'none' : '1px solid #cecece')};
  border-radius: 20px;
  cursor: pointer;
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
