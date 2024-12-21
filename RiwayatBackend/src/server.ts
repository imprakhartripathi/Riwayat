import express from 'express';
import cors from 'cors';
import path from 'path'; // Import for serving the HTML file
import { team } from './services/team/teamService';
import { vendor } from './services/vendors/vendorService';
import { cart } from './services/cart/cartService';
import { orders } from './services/orders/orderService';


const app = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:6900"]
}));



// Serve the HTML file for the root URL
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file
});

// API to get Team Data
app.get("/api/team", (request, response) => {
    response.json(team); // Send JSON data as a response
});

// API to get Vendor Data
app.get("/api/vendor", (request, response) => {
    response.json(vendor); // Send JSON data as a response
});
//API to get Cart Data
app.get("/api/cart", (request, response) => {
    response.json(cart); // Send JSON data as a response
});
//API to get Order Data
app.get("/api/orders", (request, response) => {
    response.json(orders); // Send JSON data as a response
});



const port = 5000;
app.listen(port, () => {
    console.log("Server Running On Port " + port + " Link = http://localhost:" + port);
});
