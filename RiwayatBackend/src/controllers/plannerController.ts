import { Request, Response } from "express";
import { planner } from "../services/planner/plannerService";


const plannerController = (request: Request, response: Response): void => {
  response.json(planner);
};

export default plannerController;
