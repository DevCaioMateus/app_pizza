import { Request, Response } from "express"
import { DetailUserService } from "../../services/user/DetailUserService"

export class DetailUserController {
  async handle(req: Request, res: Response) {

    const userId = req.userId

    const detailsUserService = new DetailUserService()

    const user = await detailsUserService.execute(userId)

    return res.json(user)

  }
}