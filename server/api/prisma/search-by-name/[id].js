import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = String(event.context.params.id || '').trim()

  if (!query) {
    return []
  }

  let items = await prisma.products.findMany({
    take: 6,
    orderBy: { id: 'asc' },
    where: {
      title: {
        contains: query,
        mode: 'insensitive'
      },
    },
  });

  return items;
});
