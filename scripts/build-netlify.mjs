import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const run = (command) => {
  const result = spawnSync(command, {
    env: process.env,
    shell: true,
    stdio: 'inherit'
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

process.env.NITRO_PRESET = process.env.NITRO_PRESET || 'netlify'

run('node scripts/patch-tslib-for-netlify.mjs')
run('npm run validate:production-env')
run('npx prisma generate')
run('npx nuxt build')

const prismaClientOutput = '.netlify/functions-internal/server/node_modules/.prisma/client'
const prismaPackageOutput = '.netlify/functions-internal/server/node_modules/@prisma/client'
const prismaFiles = readdirSync(prismaClientOutput).filter((file) => (
  file === 'schema.prisma' || /^libquery_engine-.+\.so\.node$/.test(file)
))

for (const file of prismaFiles) {
  const source = join(prismaClientOutput, file)
  const target = join(prismaPackageOutput, file)

  if (!existsSync(source)) {
    console.error(`Missing generated Prisma artifact: ${source}`)
    process.exit(1)
  }

  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(source, target)
}
