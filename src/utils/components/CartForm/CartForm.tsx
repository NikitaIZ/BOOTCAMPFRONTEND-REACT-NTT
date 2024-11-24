import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Client, ProductDetail } from "../../../app/domain/client";
import { mapperListProductsClient } from "../../../app/mappers/ListProductsClient";
import { CartItem } from "../../../app/domain/cart";
import { useDistricts } from "../../../app/hooks/useDistricts";

interface FormI {
    clientSelected: Client | null;
    saveClient: (data: Client) => void;
}

const CartForm: FC<FormI> = ({ saveClient, clientSelected }) => {
    const { districts } = useDistricts("/json/districts.json"); // Usa el hook aquí

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
        const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        return !emailRegex.test(email);
    };

    const isAlphabetic = (text: string): boolean => {
        const alphabetRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return alphabetRegex.test(text);
    };

    const isNumeric = (text: string): boolean => {
        const numericRegex = /^[0-9]+$/;
        return numericRegex.test(text);
    };

    const checkValidation = () => {
        const errors = { ...validation };

        errors.names = client.names === "" ? "Names are required" : !isAlphabetic(client.names) ? "Only letters are allowed" : "";
        errors.lastnames = client.lastnames === "" ? "Lastnames are required" : !isAlphabetic(client.lastnames) ? "Only letters are allowed" : "";
        errors.email = client.email === "" ? "Email is required" : !isValidEmail(client.email) ? "Invalid email format" : "";
        errors.district = client.district === "" ? "Select a district" : "";
        errors.address = client.address === "" ? "Address are required" : !isAlphabetic(client.names) ? "Only letters are allowed" : "";
        errors.reference = client.reference === "" ? "Reference are required" : !isAlphabetic(client.names) ? "Only letters are allowed" : "";
        errors.phone = client.phone === "" ? "Phone is required" : !isNumeric(client.phone) ? "Only numbers are allowed" : "";
        errors.password = client.password === "" ? "Password is required" : "";
        console.log(errors)
        setValidation(errors);
    };

    const addClient = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSendForm(true);
        checkValidation();

        if (
            validation.names !== "" &&
            validation.lastnames !== "" &&
            validation.email !== "" &&
            validation.district !== "" &&
            validation.address !== "" &&
            validation.reference !== "" &&
            validation.phone !== "" &&
            validation.password !== ""
        ) {
            const storedCart = localStorage.getItem("cart");

            let cartProducts: ProductDetail[] = [];

            if (storedCart) {
                const cart: CartItem[] = JSON.parse(storedCart);
                cartProducts = mapperListProductsClient(cart);
            }
            saveClient({
                ...client,
                id: "Test",
                products: cartProducts,
            });

            setClient(initalClient);
            setValidation(initalClient);
            setIsSendForm(false);
        }
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
        <div className="cart-form">
            <form className="form" onSubmit={addClient}>
                <h2>Detalles del comprador</h2>
                <div className="form-group">
                    <label htmlFor="names">Names:</label>
                    <input type="text" id="names" name="names" value={client.names} placeholder="Names" onChange={handleChange} required />
                    {validation.names && <p className="error-message">{validation.names}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastnames">Lastnames:</label>
                    <input type="text" id="lastnames" name="lastnames" value={client.lastnames} placeholder="Lastnames" onChange={handleChange} required />
                    {validation.lastnames && <p className="error-message">{validation.lastnames}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={client.email} placeholder="Email" onChange={handleChange} required />
                    {validation.email && <p className="error-message">{validation.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={client.password} placeholder="Password" onChange={handleChange} required />
                    {validation.password && <p className="error-message">{validation.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="district">District:</label>
                    <select id="district" name="district" value={client.district} onChange={handleChange} required>
                        {districts.map((district: string, index: number) => (
                            <option key={index} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                    {validation.district && <p className="error-message">{validation.district}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={client.address} placeholder="Address" onChange={handleChange} required />
                    {validation.address && <p className="error-message">{validation.address}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="reference">Reference:</label>
                    <input type="text" id="reference" name="reference" value={client.reference} placeholder="Reference" onChange={handleChange} required />
                    {validation.reference && <p className="error-message">{validation.reference}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={client.phone} placeholder="Phone" onChange={handleChange} required />
                    {validation.phone && <p className="error-message">{validation.phone}</p>}
                </div>
                <button type="submit" className="form-submit">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default CartForm;