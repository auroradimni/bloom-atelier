const { chmodSync, existsSync, readdirSync } = require('fs')
const { join } = require('path')

if (process.platform === 'win32') return

const binDir = join(process.cwd(), 'node_modules', '.bin')

if (!existsSync(binDir)) return

for (const entry of readdirSync(binDir)) {
  try {
    chmodSync(join(binDir, entry), 0o755)
  } catch {
    // Ignore entries that cannot be chmodded.
  }
}
