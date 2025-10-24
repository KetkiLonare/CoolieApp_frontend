import axios from "axios";
import api from "../api/axiosInstance";

// export async function fetchStates(country: string) {
//     console.log(country, "fetchStates")
//     const res = await api.post("https://countriesnow.space/api/v0.1/countries/states", { country });
//     return res.data.data.states.map((s: any) => s.name);
// }

// export async function fetchCities(country: string, state: string) {
//     console.log(country, "fetchCities   ", state)

//     const res = await api.post("https://countriesnow.space/api/v0.1/countries/state/cities", { country, state });
//     return res.data.data;
// }
// Fetch all states of a country
export async function fetchStates(country: string): Promise<string[]> {
    try {
        const res = await api.get(`https://countriesnow.space/api/v0.1/countries/states`, {
            params: { country }
        });

        if (res.data.error) {
            throw new Error(res.data.msg || "Failed to fetch states");
        }

        // Return state names
        return res.data.data.states.map((s: State) => s.name);
    } catch (error: any) {
        console.error("Error fetching states:", error.message);
        return [];
    }
}

// Fetch all cities of a state in a country
export async function fetchCities(country: string, state: string): Promise<City[]> {
    try {
        const res = await api.get(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
            params: { country, state }
        });

        if (res.data.error) {
            throw new Error(res.data.msg || "Failed to fetch cities");
        }

        return res.data.data; // array of city names
    } catch (error: any) {
        console.error("Error fetching cities:", error.message);
        return [];
    }
}


export async function chatGPTTranslate(prompt: string) {
    try {
        const res = await api.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-003",
                prompt: `Translate the following text: ${prompt}`,
                max_tokens: 200,
            },
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data.choices[0].text.trim();
    } catch (err) {
        console.error(err);
        return "Error fetching translation";
    }
}
