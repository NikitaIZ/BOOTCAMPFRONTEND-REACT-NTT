import { FC, useEffect } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import { useGlobalClientAppDispatch, useGlobalClientAppState } from "../../context/client";

import { Client } from "../../domain/interfaces/client";
import { ClientAppActions } from "../../domain/types/app-client";

import CartTable from "../../../utils/components/CartTable/CartTable";
import CartForm from "../../../utils/components/CartForm/CartForm";

import './Cart.css';

const Cart: FC = () => {
  const { clients } = useGlobalClientAppState();
  const dispatchApp = useGlobalClientAppDispatch();

  const { setStoredValue } = useLocalStorage<Client[]>("clients", []);

  const saveClient = (newClient: Client): void => {
    dispatchApp({ type: ClientAppActions.ClientSave, payload: newClient });
  };

  useEffect(() => {
    setStoredValue(clients);
  }, [clients]);

  return (
    <div className="list-cart">
      <CartTable />
      <CartForm
        saveClient={saveClient}
      />
    </div>
  );
};

export default Cart;
