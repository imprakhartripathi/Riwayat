import { Request, Response } from "express"
import { orders } from "../services/orders/orderService";

const ordersController = (request: Request, response: Response): void => {
    response.json(orders)
}

export default ordersController;