import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const id = Number(event.context.params.id)

    if (!Number.isInteger(id)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid address id' })
    }
    
    const res = await prisma.addresses.update({
        where: { id },
        data: {
            name: body.name,
            address: body.address,
            zipcode: body.zipCode,
            city: body.city,
            country: body.country,
        }
    })

    return res
})
