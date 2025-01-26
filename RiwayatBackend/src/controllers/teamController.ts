import { Request, Response } from "express"
import { team } from "../services/team/teamService"

const teamController = (request: Request, response: Response): void => {
    response.json(team)
}

export default teamController;