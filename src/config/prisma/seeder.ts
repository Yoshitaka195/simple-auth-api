// prisma/seed.ts
import * as fs from 'fs';
import * as path from 'path';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const seedsDir = path.join(__dirname, 'seeds');
  const dirs = fs.readdirSync(seedsDir);
  const sortedDirs = dirs.sort();

  console.log(sortedDirs);

  console.log('Running seeds...');
  console.log('=================');

  await prisma.$transaction(
    async (transaction) => {
      for (const dir of sortedDirs) {
        const seedFile = path.join(seedsDir, dir, 'seed.ts');

        if (fs.existsSync(seedFile)) {
          const key = path.basename(path.dirname(seedFile));
          const alreadyRun = await prisma.seed.findFirst({ where: { key } });

          if (!alreadyRun) {
            console.log(`Running seed: ${key}`);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const seed = require(seedFile);
            await seed.run(transaction);

            await transaction.seed.create({ data: { key } });
          } else {
            console.log(`Skipping already run seed: ${key}`);
          }
        }
      }
    },
    {
      maxWait: 1000000,
      timeout: 1000000,
    },
  );

  console.log('=================');
  console.log('Seeds complete!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
