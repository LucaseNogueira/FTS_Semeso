import axios from "axios";
import { format } from "date-fns";

 const api = axios.create({baseURL: process.env.REACT_APP_API_NEWS_URL});

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