import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const required = ['userId', 'name', 'address', 'zipCode', 'city', 'country']

    for (const field of required) {
        if (!body?.[field]) {
            throw createError({ statusCode: 400, statusMessage: `${field} is required` })
        }
    }
    
    const res = await prisma.addresses.create({
        data: {
            userId: body.userId,
            name: body.name,
            address: body.address,
            zipcode: body.zipCode,
            city: body.city,
            country: body.country,
        }
    })

    return res
})
