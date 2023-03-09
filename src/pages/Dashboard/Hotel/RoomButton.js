import { FaRegUser, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

export default function RoomButton({ name, capacity, booking }) {
  console.log(booking);

  function renderVacancies() {
    const vacancies = [];

    for (let i = 1; i <= capacity; i++) {
      if (i > booking.length) {
        vacancies.push(<FaRegUser key={i} />);
      } else {
        vacancies.push(<FaUser key={i} />);
      }
    }
    return vacancies;
  }

  return (
    <Room>
      <p>{name}</p>
      <div>{renderVacancies()}</div>
    </Room>
  );
}

const Room = styled.button`
  background-color: #fff;
  min-width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  div{
    display: flex;
    flex-direction: row-reverse;
  }
`;
