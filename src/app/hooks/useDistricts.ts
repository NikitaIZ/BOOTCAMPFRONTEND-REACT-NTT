import { useState, useEffect } from "react";

interface DistrictsResponse {
    districts: string[];
}

export const useDistricts = (): { districts: string[] } => {
    const [districts, setDistricts] = useState<string[]>([]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await fetch("/json/districts.json");
                if (!response.ok) {
                    throw new Error(`Error al cargar distritos: ${response.statusText}`);
                }
                const data: DistrictsResponse = await response.json();
                setDistricts(data.districts);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error(err.message);
                }
                setDistricts([]);
            }
        };

        fetchDistricts();
    }, []); 

    return { districts };
};