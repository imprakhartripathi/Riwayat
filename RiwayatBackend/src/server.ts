import express from 'express';
import cors from 'cors';

// JSON import
import { team } from './assets/team/teamService'
import { vendor } from './assets/vendors/vendorService'

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:6900"]
}));

// API
app.get("/api/team", (request, response) => {
    response.json(team); // Send JSON data as a response
});

app.get("/api/vendor", (request, response) => {
    response.json(vendor); // Send JSON data as a response
});

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
