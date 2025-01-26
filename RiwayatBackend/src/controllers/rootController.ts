import { Request, Response } from "express";
import path from 'path'

const rootController = (request: Request, response: Response): void => {
     response.sendFile(path.join(__dirname, './../index.html')); // Serve the HTML file
}

export default rootController;