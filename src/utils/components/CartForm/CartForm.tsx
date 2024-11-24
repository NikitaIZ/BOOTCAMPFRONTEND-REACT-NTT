import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Client, ClientProduct } from "../../../app/domain/client";
import { mapperListProductsClient } from "../../../app/mappers/ListProductsClient";
import { CartItem } from "../../../app/domain/cart";
import { useDistricts } from "../../../app/hooks/useDistricts";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../../app/context/cart";
import { CartAppActions } from "../../../app/domain/app-cart";


import "./CartForm.css";

interface FormI {
    clientSelected: Client | null;
    saveClient: (data: Client) => void;
}

const CartForm: FC<FormI> = ({ saveClient, clientSelected }) => {
    const { districts } = useDistricts("/json/districts.json");
    const { dispatch } = useCart();
    const navigate = useNavigate();

    const initalClient: Client = {
        id: "",
        names: "",
        lastnames: "",
        email: "",
        district: "",
        address: "",
        reference: "",
        phone: "",
        password: "",
        products: []
    };

    const [validation, setValidation] = useState<Omit<Client, "id">>({
        names: "",
        lastnames: "",
        email: "",
        district: "",
        address: "",
        reference: "",
        phone: "",
        password: "",
        products: []
    });

    const [client, setClient] = useState<Client>(initalClient);
    const [isSendForm, setIsSendForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [cartError, setCartError] = useState<string>("");

    const handleChange = ({
        target,
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const key = target.id;
        const value = target.value;
        setClient({
            ...client,
            [key]: value,
        });
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isAlphabetic = (text: string): boolean => {
        const alphabetRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return alphabetRegex.test(text);
    };

    const isNumeric = (text: string): boolean => {
        const numericRegex = /^[0-9]+$/;
        return numericRegex.test(text);
    };

    const generateUniqueId = (): string => {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomString}`;
    };


    const checkValidation = () => {
        const errors = { ...validation };

        errors.names = client.names === "" ? "Names are required" : !isAlphabetic(client.names) ? "Only letters are allowed" : "";
        errors.lastnames = client.lastnames === "" ? "Lastnames are required" : !isAlphabetic(client.lastnames) ? "Only letters are allowed" : "";
        errors.email = client.email === "" ? "Email is required" : !isValidEmail(client.email) ? "Invalid email format" : "";
        errors.district = client.district === "" ? "Select a district" : "";
        errors.address = client.address === "" ? "Address is required" : "";
        errors.reference = client.reference === "" ? "Reference is required" : "";
        errors.phone = client.phone === "" ? "Phone is required" : !isNumeric(client.phone) ? "Only numbers are allowed" : "";
        errors.password = client.password === "" ? "Password is required" : "";
        setValidation(errors);
    };

    const addClient = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const storedCart = localStorage.getItem("cart");
        let cartProducts: ClientProduct[] = [];

        if (storedCart) {
            const cart: CartItem[] = JSON.parse(storedCart);
            cartProducts = mapperListProductsClient(cart);
        }

        if (cartProducts.length === 0) {
            setCartError("You must have at least one product in your cart.");
            return;
        }

        setCartError("");
        setIsSendForm(true);
        checkValidation();

        if (
            validation.names == "" &&
            validation.lastnames == "" &&
            validation.email == "" &&
            validation.district == "" &&
            validation.address == "" &&
            validation.reference == "" &&
            validation.phone == "" &&
            validation.password == ""
        ) {
            saveClient({
                ...client,
                id: generateUniqueId(),
                products: cartProducts,
            });

            setClient(initalClient);
            setValidation(initalClient);
            setIsSendForm(false);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        dispatch({ type: CartAppActions.CartDeleteAllProducts });
        setIsModalOpen(false);
        navigate("/");
    };

    useEffect(() => {
        if (isSendForm) {
            checkValidation();
        }
    }, [client]);

    useEffect(() => {
        if (clientSelected) {
            setClient(clientSelected as Client);
        }
    }, [clientSelected]);

    return (
        <div>
            <form onSubmit={addClient}>
                <h2>Customer Form</h2>
                {cartError && <p className="error-message">{cartError}</p>}
                <div className="form-group">
                    <div>
                        <label htmlFor="names">Names:</label>
                        <input type="text" id="names" name="names" value={client.names} placeholder="John" onChange={handleChange} required />
                        {validation.names && <span className="error-message">{validation.names}</span>}
                    </div>
                    <div>
                        <label htmlFor="lastnames">Last Names:</label>
                        <input type="text" id="lastnames" name="lastnames" value={client.lastnames} placeholder="Doe" onChange={handleChange} required />
                        {validation.lastnames && <span className="error-message">{validation.lastnames}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={client.email} placeholder="john.doe@mail.com" onChange={handleChange} required />
                        {validation.email && <span className="error-message">{validation.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={client.password} placeholder="" onChange={handleChange} required />
                        {validation.password && <span className="error-message">{validation.password}</span>}
                    </div>
                    <div>
                        <label htmlFor="district">District:</label>
                        <select id="district" name="district" value={client.district} onChange={handleChange} required>
                            {districts.map((district: string, index: number) => (
                                <option key={index} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                        {validation.district && <span className="error-message">{validation.district}</span>}
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" value={client.address} placeholder="123 Maple Street. Anytown, PA 17101" onChange={handleChange} required />
                        {validation.address && <span className="error-message">{validation.address}</span>}
                    </div>
                    <div>
                        <label htmlFor="reference">Reference:</label>
                        <input type="text" id="reference" name="reference" value={client.reference} placeholder="Reference" onChange={handleChange} required />
                        {validation.reference && <span className="error-message">{validation.reference}</span>}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={client.phone} placeholder="000000000" onChange={handleChange} required />
                        {validation.phone && <span className="error-message">{validation.phone}</span>}
                    </div>
                    <button type="submit" className="form-submit">Send</button>
                </div>
            </form>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Buy complete</h3>
                        <p>Thank you.</p>
                        <button onClick={closeModal} className="button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartForm;