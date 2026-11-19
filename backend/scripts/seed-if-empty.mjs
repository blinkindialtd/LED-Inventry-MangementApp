import { PrismaClient } from '@prisma/client';
import { spawnSync } from 'node:child_process';

process.env.DATABASE_URL = process.env.DATABASE_URL || process.env.NETLIFY_DB_URL;

const prisma = new PrismaClient();

try {
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    console.log(`Database already seeded (${userCount} users found), skipping seed.`);
  } else {
    console.log('Database is empty, running seed...');
    const result = spawnSync('npx', ['tsx', 'prisma/seed.ts'], {
      stdio: 'inherit',
      env: process.env,
    });
    process.exitCode = result.status ?? 1;
  }
} catch (error) {
  console.error('Seed check failed:', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
