import prismaClient from "../../prisma"

interface ProductRequest {
  categoryId: string
}

export class ListByCategoryService {
  async execute({categoryId}: ProductRequest){
    // id category
    const findByCategory = await prismaClient.product.findMany({
      where: {
        categoryId: categoryId
      },
    })

    return findByCategory
    
  }
}