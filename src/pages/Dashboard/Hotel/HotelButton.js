import styled from 'styled-components';

const HotelButton = ({ hotel }) => {
  return (
    <>
      <Hotelbutton>
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
          <p>103</p>
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
  /* background-color: ${(prop) => (prop.clicked ? 'transparent' : '#FFEED2')}; */
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
  h2{
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
