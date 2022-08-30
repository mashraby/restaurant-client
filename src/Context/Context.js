import { createContext, useEffect, useState } from "react";

const Context = createContext();

function Provider({ children }) {
  const localCorzinka = JSON.parse(window.localStorage.getItem("corzinka"));

  const [corzinka, setCorzinka] = useState(localCorzinka || []);

  useEffect(() => {
    window.localStorage.setItem("corzinka", JSON.stringify(corzinka));
  }, [corzinka]);

  const localOrders = JSON.parse(window.localStorage.getItem("orders"));

  const [orders, setOrders] = useState(localOrders || []);

  useEffect(() => {
    window.localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <Context.Provider
      value={{
        corzinka,
        setCorzinka,
        localCorzinka,
        orders,
        setOrders,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
