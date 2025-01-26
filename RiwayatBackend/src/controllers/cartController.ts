import { Request, Response } from "express"
import { cart } from "../services/cart/cartService";


const cartController = (request: Request, response: Response): void => {
    response.json(cart)
}

export default cartController;