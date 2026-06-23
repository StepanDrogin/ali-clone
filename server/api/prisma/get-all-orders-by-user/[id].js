import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    if (!event.context.params.id) {
        throw createError({ statusCode: 400, statusMessage: 'User id is required' })
    }

    let orders = await prisma.orders.findMany({
        where: { userId: event.context.params.id },
        orderBy: { id: "desc" },
        include: { 
            orderItem: {
                include: {
                    product: true
                }
            }
            
        }
    })
    return orders
})
