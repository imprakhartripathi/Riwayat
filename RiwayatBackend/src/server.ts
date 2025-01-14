import express from 'express';
import cors from 'cors';
import path from 'path'; // Import for serving the HTML file
import bodyParser from 'body-parser'; // For parsing request body
import { team } from './services/team/teamService';
import { vendor } from './services/vendors/vendorService';
import { cart } from './services/cart/cartService';
import { orders } from './services/orders/orderService';
import { planner } from './services/planner/plannerService'


const app = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:6900"]
}));
app.use(bodyParser.json()); // Middleware to parse JSON requests



// Serve the HTML file for the root URL
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file
});

// API to handle authentication
app.post('/api/auth/login', (request: any, response: any) => {
    const { username, password } = request.body;

    // Validate username and password
    const user = team.find(user => user.username === username && user.password === password);

    if (user) {
        // On success, return user details (omit password)
        const { password, ...userDetails } = user;
        return response.json({ success: true, user: userDetails });
    }

    // On failure, return an error
    return response.status(401).json({ success: false, message: 'Invalid username or password' });
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
//API to get Planner Data
app.get("/api/planner", (request, response) => {
    response.json(planner); // Send JSON data as a response
});



const port = 5000;
app.listen(port, () => {
    console.log("Server Running On Port " + port + " Link = http://localhost:" + port);
});
