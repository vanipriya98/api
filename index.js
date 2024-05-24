require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://vanipriya:vani1234@cluster0.ezmlifm.mongodb.net/', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // dbName: 'NEWS APP'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const newsRoutes = require("./routes/newsRoutes");
const userRoutes=require("./routes/userRoutes")
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/user", userRoutes)

// Basic route
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
