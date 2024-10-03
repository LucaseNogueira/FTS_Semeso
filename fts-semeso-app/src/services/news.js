import axios from "axios";
import { format } from "date-fns";

const api = axios.create({baseURL: "http://127.0.0.1:8000/news"});

async function getNewsWithTerms(sentence){
    const response = await api.get(`/?sentence=${sentence}`);
    const data = response.data ? response.data : [];

    data.map(n => (
        n.date = format(new Date(n.date), "dd/mm/yyyy")
    ));

    return data;
}

export {
    getNewsWithTerms
}