process.env.DATABASE_URL = process.env.NETLIFY_DB_URL || process.env.DATABASE_URL

await import('../../dist/server.js')
