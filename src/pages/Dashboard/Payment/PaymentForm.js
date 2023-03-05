import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Reserve } from '.';
import useToken from '../../../hooks/useToken';
import instance from '../../../services/api';

const PaymentForm = ({ ticketId, setPaid }) => {
  const navigate = useNavigate();
  const token = useToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [focus, setFocus] = useState('');
  const [issuer, setIssuer] = useState('');

  const handleCallback = ({ issuer, maxLength }) => {
    setIssuer(issuer);
  };

  async function handlePayment(e) {
    e.preventDefault();

    const cardData = {
      issuer,
      number,
      name,
      expirationDate: date,
      cvv,
    };

    const data = { ticketId, cardData };

    try {
      await instance.post('/payments/process', data, config);
      setPaid(true);
    } catch (err) {
      toast(err.response.data.message);
      if (err.response.status === 401) navigate('/sign-in');
    }
  }

  return (
    <>
      <DivTest id="PaymentForm">
        <Cards number={number} expiry={date} cvc={cvv} name={name} focused={focus} callback={handleCallback} />
        <FormBox onSubmit={handlePayment}>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            maxLength="19"
            inputMode="numeric"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value.replace(/\D/g, ''));
            }}
            onFocus={(e) => setFocus(e.target.name)}
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            maxLength="50"
            inputMode="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value.replace(/[^a-zA-Z ]/g, ''));
            }}
            onFocus={(e) => setFocus(e.target.name)}
          />

          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            maxLength="4"
            inputMode="numeric"
            value={date}
            onChange={(e) => {
              setDate(e.target.value.replace(/\D/g, ''));
            }}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="tel"
            name="cvc"
            placeholder="cvv"
            maxLength="3"
            inputMode="numeric"
            value={cvv}
            onChange={(e) => {
              setCvv(e.target.value.replace(/\D/g, ''));
            }}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <Reserve type="submit">FINALIZAR PAGAMENTO</Reserve>
        </FormBox>
      </DivTest>
    </>
  );
};

export default PaymentForm;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px;
  width: 50%;

  input {
    height: 30px;
  }
`;

const DivTest = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  div {
    margin: 0;
  }
`;
