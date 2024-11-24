import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Client } from "../../../app/domain/client";
import { CartAppActions } from "../../../app/domain/app-cart";

import { useDistricts } from "../../../app/hooks/useDistricts";
import { useValidation } from "../../../app/hooks/useValidation";
import { useGeneratorId } from "../../../app/hooks/useGeneratorId";

import { mapperListProductsClient } from "../../../app/mappers/ListProductsClient";

import { useGlobalCartAppState, useGlobalCartAppDispatch } from "../../../app/context/cart";

import "./CartForm.css";

interface FormI {
    clientSelected: Client | null;
    saveClient: (data: Client) => void;
}

const CartForm: FC<FormI> = ({ saveClient, clientSelected }) => {
    const navigate = useNavigate();

    const { districts } = useDistricts("/json/districts.json");

    const { items } = useGlobalCartAppState();
    const cartAppDispatch = useGlobalCartAppDispatch();

    const { isValidEmail, isAlphabetic, isNumeric } = useValidation();

    const { generateUniqueId } = useGeneratorId();

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

    const [validation, setValidation] = useState<Omit<Client, "id" | "products">>({
        names: "",
        lastnames: "",
        email: "",
        district: "",
        address: "",
        reference: "",
        phone: "",
        password: ""
    });

    const [client, setClient] = useState<Client>(initalClient);
    const [touched, setTouched] = useState<Partial<Record<keyof Client, boolean>>>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [cartError, setCartError] = useState<string>("");

    const handleChange = ({
        target,
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const key = target.id as keyof Client;
        const value = target.value;

        setClient({
            ...client,
            [key]: value,
        });

        if (!touched[key]) {
            setTouched({
                ...touched,
                [key]: true,
            });
        }
    };

    const validateForm = () => {
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
    
        const cartProducts = mapperListProductsClient(items);
    
        if (cartProducts.length === 0) {
            setCartError("You must have at least one product in your cart.");
            return;
        }
    
        setCartError("");
    
    
        setTouched({
            names: true,
            lastnames: true,
            email: true,
            district: true,
            address: true,
            reference: true,
            phone: true,
            password: true,
        });
    
        const errors = {
            names: client.names === "" ? "Names are required" : !isAlphabetic(client.names) ? "Only letters are allowed" : "",
            lastnames: client.lastnames === "" ? "Lastnames are required" : !isAlphabetic(client.lastnames) ? "Only letters are allowed" : "",
            email: client.email === "" ? "Email is required" : !isValidEmail(client.email) ? "Invalid email format" : "",
            district: client.district === "" ? "Select a district" : "",
            address: client.address === "" ? "Address is required" : "",
            reference: client.reference === "" ? "Reference is required" : "",
            phone: client.phone === "" ? "Phone is required" : !isNumeric(client.phone) ? "Only numbers are allowed" : "",
            password: client.password === "" ? "Password is required" : "",
        };
    
        setValidation(errors); 
    
        const hasErrors = Object.values(errors).some((error) => error !== "");
    
        if (hasErrors) {
            return; 
        }
    
        saveClient({
            ...client,
            id: generateUniqueId(),
            products: cartProducts,
        });
    
        setClient(initalClient);
        setTouched({});
        setValidation({
            names: "",
            lastnames: "",
            email: "",
            district: "",
            address: "",
            reference: "",
            phone: "",
            password: ""
        });
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        cartAppDispatch({ type: CartAppActions.CartDeleteAllProducts });
        setIsModalOpen(false);
        navigate("/");
    };

    useEffect(() => {
        validateForm();
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
                        <input
                            type="text"
                            id="names"
                            name="names"
                            value={client.names}
                            placeholder="John"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {touched.names && validation.names && <span className="error-message">{validation.names}</span>}
                    </div>
                    <div>
                        <label htmlFor="lastnames">Last Names:</label>
                        <input
                            type="text"
                            id="lastnames"
                            name="lastnames"
                            value={client.lastnames}
                            placeholder="Doe"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {touched.lastnames && validation.lastnames && <span className="error-message">{validation.lastnames}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={client.email}
                            placeholder="john.doe@mail.com"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {touched.email && validation.email && <span className="error-message">{validation.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={client.password}
                            placeholder=""
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {touched.password && validation.password && <span className="error-message">{validation.password}</span>}
                    </div>
                    <div>
                        <label htmlFor="district">District:</label>
                        <select
                            id="district"
                            name="district"
                            value={client.district}
                            onChange={handleChange}
                            autoComplete="off"
                        >
                            {districts.map((district: string, index: number) => (
                                <option key={index} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                        {touched.district && validation.district && <span className="error-message">{validation.district}</span>}
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={client.address}
                            placeholder="123 Maple Street. Anytown, PA 17101"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {touched.address && validation.address && <span className="error-message">{validation.address}</span>}
                    </div>
                    <div>
                        <label htmlFor="reference">Reference:</label>
                        <input
                            type="text"
                            id="reference"
                            name="reference"
                            value={client.reference}
                            placeholder="Reference"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {touched.reference && validation.reference && <span className="error-message">{validation.reference}</span>}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={client.phone}
                            placeholder="000000000"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {touched.phone && validation.phone && <span className="error-message">{validation.phone}</span>}
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
