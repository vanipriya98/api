const News = require('../models/news');

// Create News
exports.newsCreateController = async (req, res) => {
    try {
        const { title, content, category, image } = req.body;
    
        if (!title || !content || !category || !image) {
            return res.status(400).json({ message: "Required fields are missing" });
        }
        const news = new News({
            title,
            content,
            category,
            image
        });

        // Save the news object to the database
        await news.save();

        return res.status(201).json({
            message: "News created successfully",
            news
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// Get All News
exports.getAllNewsController = async (req, res) => {
    try {
        const news = await News.find({});
        return res.status(200).json({
            message: "Success",
            news
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// Get News By ID
exports.getNewsByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        return res.status(200).json({
            message: "Success",
            news
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// Delete News By ID
exports.deleteNewsByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        return res.status(200).json({
            message: "News deleted successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};
