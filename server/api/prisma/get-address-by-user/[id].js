import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {    
    if (!event.context.params.id) {
        throw createError({ statusCode: 400, statusMessage: 'User id is required' })
    }

    const res = await prisma.addresses.findFirst({
        where: { userId: event.context.params.id }
    })
    return res
})
