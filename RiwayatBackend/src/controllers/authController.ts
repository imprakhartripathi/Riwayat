import { Request, Response } from "express";
import { team } from "../services/team/teamService";

const authController = (request: Request, response: Response): void => {
    const { username, password } = request.body;

    // Validate username and password
    const user = team.find(user => user.username === username && user.password === password);
  
    if (user) {
        // On success, return user details (omit password)
        const { password, ...userDetails } = user;
        response.json({ success: true, user: userDetails });
    }
  
    // On failure, return an error
    response.status(401).json({ success: false, message: 'Invalid username or password' });
    
}

export default authController;
