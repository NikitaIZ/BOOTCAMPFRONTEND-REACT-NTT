import { useState, useEffect } from "react";

interface DistrictsResponse {
    districts: string[];
}

export const useDistricts = (jsonPath: string): {
    districts: string[];

} => {
    const [districts, setDistricts] = useState<string[]>([]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await fetch(jsonPath);
                if (!response.ok) {
                    throw new Error(`Error al cargar distritos: ${response.statusText}`);
                }
                const data: DistrictsResponse = await response.json();
                setDistricts(data.districts);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                } else {
                    throw new Error("Error desconocido al cargar distritos");
                }
            }
        };

        fetchDistricts();
    }, [jsonPath]);

    return { districts };
};
