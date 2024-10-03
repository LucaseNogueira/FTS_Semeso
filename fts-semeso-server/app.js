const express = require("express");
const cors = require("cors");
const newsRoute = require('./src/route/news');

const app = express();

app.use(express.json());
app.use(cors({origin:"*"}));

app.use('/news', newsRoute);

const port = 8000;

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`); 
});