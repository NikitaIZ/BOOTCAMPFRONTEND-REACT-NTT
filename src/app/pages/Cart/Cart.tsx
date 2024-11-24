import { FC, useEffect } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import { useGlobalClientAppDispatch, useGlobalClientAppState } from "../../context/client";

import { Client } from "../../domain/client";
import { ClientAppActions } from "../../domain/app-client";

import CartTable from "../../../utils/components/CartTable/CartTable";
import CartForm from "../../../utils/components/CartForm/CartForm";

import './Cart.css';

const Cart: FC = () => {
    const { clients, clientSelected } = useGlobalClientAppState();
    const dispatchApp = useGlobalClientAppDispatch();

    const { setStoredValue } = useLocalStorage<Client[]>("clients", []);
  
    const saveClient = (newClient: Client): void => {
      dispatchApp({ type: ClientAppActions.SaveClient, payload: newClient });
    };
 
    useEffect(() => {
      setStoredValue(clients);
    }, [clients, clientSelected]);

    return (
        <div className="list-cart">
            <CartTable />
            <CartForm 
            saveClient={saveClient}
            clientSelected={clientSelected}/>
        </div>
    );
};

export default Cart;
