import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const id = Number(event.context.params.id)

    if (!Number.isInteger(id)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid product id' })
    }

    let product = await prisma.products.findFirst({
        where: { id }
    })

    if (!product) {
        throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }

    return product
})
