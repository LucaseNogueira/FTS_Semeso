

function removeStopWords(text){
    const stopword = require('stopword');

    const words = text.split(' ');
    const filterWords = stopword.removeStopwords(words);

    return filterWords.join(' ');
}

module.exports = {
    removeStopWords
}