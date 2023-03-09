import { FaRegUser, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

export default function RoomButton() {
  return (
    <Room>
      <p>102</p>
      <div>
        <FaUser />
        <FaRegUser />
      </div>
    </Room>
  );
}

const Room = styled.button`
  background-color: #fff;
  min-width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`;
