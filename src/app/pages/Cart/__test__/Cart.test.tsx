import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalClientAppProvider } from "@/app/context/client";
import { ClientAppActions } from "@/app/domain/types/app-client";
import Cart from "../Cart";

jest.mock("@/utils/components/CartTable/CartTable", () => jest.fn(() => <div>CartTable</div>));
jest.mock("@/utils/components/CartForm/CartForm", () => jest.fn(({ saveClient }) => (
    <button onClick={() => saveClient({
        id: "Resident-evil-2",
        names: 'Leon Scott',
        lastnames: 'Kennedy',
        email: 'agentedepolicia41@raccoon.com',
        district: 'Raccoon',
        address: 'Estacion de policia',
        reference: 'Lo que solicia ser un museo',
        phone: '896635789',
        password: 'Miprimerdia',
        products: [{
            id: 1,
            title: 'Pistola',
            quantity: 1,
            price: 45,
            total: 45,
        }]
    })}>
        Buy
    </button>
)));

describe("Cart Component", () => {

    it("should call dispatchApp with the correct action when saveClient is called", () => {
        const dispatchMock = jest.fn();

        jest.spyOn(require("@/app/context/client"), 'useGlobalClientAppDispatch').mockReturnValue(dispatchMock);

        render(
            <GlobalClientAppProvider>
                <Cart />
            </GlobalClientAppProvider>
        );

        const saveClientButton = screen.getByText("Buy");
        fireEvent.click(saveClientButton);

        expect(dispatchMock).toHaveBeenCalledWith({
            type: ClientAppActions.ClientSave,
            payload: {
                id: "Resident-evil-2",
                names: 'Leon Scott',
                lastnames: 'Kennedy',
                email: 'agentedepolicia41@raccoon.com',
                district: 'Raccoon',
                address: 'Estacion de policia',
                reference: 'Lo que solicia ser un museo',
                phone: '896635789',
                password: 'Miprimerdia',
                products: [{
                    id: 1,
                    title: 'Pistola',
                    quantity: 1,
                    price: 45,
                    total: 45,
                }]
            },
        });
    });
});
