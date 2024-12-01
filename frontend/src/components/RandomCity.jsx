import React, { useState } from "react";
import axios from "axios";

const RandomCityButton = () => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchRandomCity = async () => {
        setLoading(true);
        try {
            const query = `
                [out:json];
                area["place"="city"]["population"](if: t["population"] > ${500000});
                out body;`;

            const response = await axios.post("https://overpass-api.de/api/interpreter", query, {
                headers: { "Content-Type": "text/plain" },
            });

            const cities = response.data.elements.map((element) => element.tags.name);

            if (cities.length > 0) {
                const randomCity = cities[Math.floor(Math.random() * cities.length)];
                setCity(randomCity);
            } else {
                setCity("No cities found in the specified area.");
            }
        } catch (error) {
            console.error("Error fetching city data:", error);
            setCity("Failed to fetch city.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchRandomCity} disabled={loading}>
                {loading ? "Loading..." : "Get Random City"}
            </button>
            {city && <p>Random City: {city}</p>}
        </div>
    );
};

export default RandomCityButton;
