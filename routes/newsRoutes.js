const express = require("express");
const router = express.Router();
const newsController = require('../controllers/newsController.js');
const authMiddleware = require("../middleware.js")
router.post("/create-news", authMiddleware, newsController.newsCreateController); 
router.get("/get-news", authMiddleware, newsController.getAllNewsController);
router.get("/get-news/:id", authMiddleware, newsController.getNewsByIdController); 
router.delete("/delete-news/:id", authMiddleware, newsController.deleteNewsByIdController);

module.exports = router;
