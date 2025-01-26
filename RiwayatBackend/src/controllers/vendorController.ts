import { Request, Response } from "express"
import { vendor } from "../services/vendors/vendorService";

const vendorController = (request: Request, response: Response): void => {
    response.json(vendor);
}

export default vendorController;