const { Router } = require("express");
const { getNews } = require('../controller/news');

const router = Router();

router.get('/', getNews);
 
module.exports = router;