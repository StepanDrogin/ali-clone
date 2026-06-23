import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const products = Array.isArray(body.products) ? body.products : []

    if (!body.userId || !body.stripeId) {
        throw createError({ statusCode: 400, statusMessage: 'User and payment ids are required' })
    }

    if (!products.length) {
        throw createError({ statusCode: 400, statusMessage: 'Order must contain products' })
    }
    
    return await prisma.$transaction(async (tx) => {
        const order = await tx.orders.create({
            data: {
                userId: body.userId,
                stripeId: body.stripeId,
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country,
            }
        })

        await tx.orderItem.createMany({
            data: products.map((prod) => ({
                orderId: order.id,
                productId: Number(prod.id),
            }))
        })

        return tx.orders.findUnique({
            where: { id: order.id },
            include: {
                orderItem: {
                    include: {
                        product: true
                    }
                }
            }
        })
    })
})
