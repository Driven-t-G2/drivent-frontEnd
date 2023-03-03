import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';

const PaymentForm = () => {
  const [number, SetNumber] = useState('');
  const [name, SetName] = useState('');
  const [date, SetDate] = useState('');
  const [cvc, SetCvc] = useState('');
  const [focus, SetFocus] = useState('');

  return (
    <div id="PaymentForm">
      <Cards number={number} expiry={date} cvc={cvc} name={name} focused={focus} />
      <form>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => {
            SetName(e.target.value);
          }}
          onFocus={(e) => SetFocus(e.target.name)}
        />
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={number}
          onChange={(e) => {
            SetNumber(e.target.value);
          }}
          onFocus={(e) => SetFocus(e.target.name)}
        />
        <input
          type="number"
          name="expiry"
          placeholder="expiry"
          value={date}
          onChange={(e) => {
            SetDate(e.target.value);
          }}
          onFocus={(e) => SetFocus(e.target.name)}
        />
        <input
          type="number"
          name="cvc"
          placeholder="cvc"
          value={cvc}
          onChange={(e) => {
            SetCvc(e.target.value);
          }}
          onFocus={(e) => SetFocus(e.target.name)}
        />
        ...
      </form>
    </div>
  );
};

export default PaymentForm;
