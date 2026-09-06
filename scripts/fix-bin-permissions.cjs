const { chmodSync, existsSync, readdirSync } = require('fs')
const { join } = require('path')

if (process.platform === 'win32') return

function makeExecutable(path) {
  if (!existsSync(path)) return

  try {
    chmodSync(path, 0o755)
  } catch {
    // Ignore entries that cannot be chmodded.
  }
}

const binDir = join(process.cwd(), 'node_modules', '.bin')

if (existsSync(binDir)) {
  for (const entry of readdirSync(binDir)) {
    makeExecutable(join(binDir, entry))
  }
}

for (const cliPath of [
  join(process.cwd(), 'node_modules', '@nuxt/cli', 'bin', 'nuxi.mjs'),
  join(process.cwd(), 'node_modules', 'nuxt', 'bin', 'nuxt.mjs')
]) {
  makeExecutable(cliPath)
}
