import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import routes from './Routes/routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));