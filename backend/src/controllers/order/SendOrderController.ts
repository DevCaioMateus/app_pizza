import { Request, Response } from "express"

import { SendOrderService } from "../../services/order/SendOrderService"

export class SendOrderController {
  async handle(req: Request, res: Response){

    const { orderId } = req.body

    const sendOrder = new SendOrderService()

    const order = await sendOrder.execute({
      orderId
    })

    return res.json(order)

  }
}