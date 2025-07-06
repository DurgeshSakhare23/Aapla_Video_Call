import express from 'express'
import {createServer} from 'node:http'
import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose'
import {connectToSocket} from './controllers/socketManager.js'

import cors from 'cors'
import userRoutes from './routes/user.routes.js'

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8080))
app.use(cors());
app.use(express.json({limit: '40kb'}));
app.use(express.urlencoded({limit: '40kb', extended: true}));

app.use("/api/v1/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const MONGO_URL = process.env.MONGO_URL

const start = async () => {
    const connection = await mongoose.connect(MONGO_URL);
    console.log(`Mongo DB Connected: ${connection.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log('Server started on port 8080');
    });
}

start();