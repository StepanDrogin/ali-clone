import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const packagePath = new URL('../node_modules/tslib/package.json', import.meta.url)

if (!existsSync(packagePath)) {
  console.log('Skipping tslib export patch because tslib is not installed.')
  process.exit(0)
}

const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))

const replaceEsmExport = (value) => {
  if (value === './tslib.es6.mjs') {
    return './tslib.js'
  }

  if (Array.isArray(value)) {
    return value.map(replaceEsmExport)
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, replaceEsmExport(entry)])
    )
  }

  return value
}

const nextExports = replaceEsmExport(packageJson.exports)

if (JSON.stringify(nextExports) === JSON.stringify(packageJson.exports)) {
  console.log('tslib export map already matches Netlify function bundling requirements.')
  process.exit(0)
}

packageJson.exports = nextExports
writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)

console.log('Patched tslib export map for Netlify function bundling.')
