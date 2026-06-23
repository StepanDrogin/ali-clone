import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma = globalForPrisma.__marketExpressPrisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__marketExpressPrisma = prisma
}

export default prisma
