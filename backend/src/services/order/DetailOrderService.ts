import prismaClient from "../../prisma"

interface DetailRequest {
  orderId: string
}

export class DetailOrderService {
  async execute({ orderId }: DetailRequest) {

    const orders = await prismaClient.item.findMany({
      where: {
        orderId: orderId
      },
      include: {
        product: true,
        order: true
      }
    })

    return orders

  }
}