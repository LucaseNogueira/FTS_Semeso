const { query } = require('express');
const {PgConnect} = require('../adapter/dao/PgConnect');
const { removeStopWords } = require('../util/stringUtil');

async function getNewsWithTerms(text){
    try {
        let query_str = 'SELECT newtitle as title,'
      + '       autname as author,'
      + '       newdescription as description,'
      + '       newlink as link,'
      + '       newpubdate as date,'
      + '       newtsvector'
      + '  FROM tbnews'
      + ' INNER JOIN tbnewsauthor ON tbnews.newid = tbnewsauthor.newid'
      + ' INNER JOIN tbauthor ON tbnewsauthor.autid = tbauthor.autid'
      + ' WHERE newtsvector @@ plainto_tsquery($1, $2)'
      + ' LIMIT 15';

        const terms = removeStopWords(text);
        const db = new PgConnect();
        const news = await db.query(query_str, [process.env.PG_TS_CONFIG, terms]);

        return news;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getNewsWithTerms
}