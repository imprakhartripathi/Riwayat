import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // For parsing request body
import router from './router';
import { originPort, serverPort } from './serversettings';


const app = express();

app.use(cors({
    credentials: true,
    origin: [originPort]
}));
app.use(bodyParser.json()); // Middleware to parse JSON requests

app.use(router);

app.listen(serverPort, () => {
    console.log("Server Running On Port " + serverPort + " Link = http://localhost:" + serverPort);
});
