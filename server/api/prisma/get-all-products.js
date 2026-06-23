import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    let products = await prisma.products.findMany({
        orderBy: { id: 'asc' }
    })
    return products
})
