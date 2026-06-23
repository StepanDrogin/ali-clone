import { spawnSync } from 'node:child_process'

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

run('npm run validate:production-env')
run('npx prisma generate')
run('npx nuxt build')
