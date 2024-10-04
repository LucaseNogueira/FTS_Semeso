const { getNewsWithTerms } = require('../service/news');

async function getNews(req, res){
    try{
        const sentence = req.query.sentence;
        const response = sentence ? await getNewsWithTerms(sentence) : [];

        res.json(response);
    }catch(error){
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = {
    getNews
}