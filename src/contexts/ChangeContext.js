import { createContext, useState } from 'react';

const ChangeContext = createContext();
export default ChangeContext;

export function ChangeProvider({ children }) {
  const [change, setChange] = useState(false);
  
  return (
    <ChangeContext.Provider value={{ change, setChange }}>
      {children}
    </ChangeContext.Provider>
  );
}
