import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

export default function Payment() {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {/* <ContainerWarning>
        <h5>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h5>
      </ContainerWarning> */}
      <ContainerTicket>
        <h5>Primeiro, escolha sua modalidade de ingresso</h5>
        <Modalidade>
          <Button>
            Presencial
            <p>R$ 250</p>
          </Button>
          <Button>
            Online
            <p>R$ 350</p>
          </Button>
        </Modalidade>
      </ContainerTicket>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

// const ContainerWarning = styled.div`
//   width: 100%;
//   height: 70vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   h5{
//     text-align: center;
//     width: 30rem;
//     height: 2.5rem;
//     font-size: 20px;
//     color: #8E8E8E;
//   }
// `; 

const ContainerTicket = styled.div`
  width: 50%;
  margin-top: 40px;
  h5{
    color: #8E8E8E;
  }
`;
const Modalidade = styled.div` 
  margin-top: 20px;
  display: flex;
  color: #8E8E8E;
`;
const Button = styled.button`
  width: 145px;
  height: 145px;
  margin-right: 1rem;
  border: 1px solid #CECECE;
  border-radius: 20px;
  /* background-color: ${(prop) => prop.clicked? 'transparent' : '#FFEED2'}; */
  cursor: pointer;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p{
    color: #CECECE;
    font-size: 14px;
    padding-top: 3px;
  }

`;

