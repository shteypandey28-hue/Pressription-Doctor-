import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Path to sql file: ../seed_medicines.sql (Assuming running from backend root, so backend/../seed_medicines.sql)
    // __dirname is backend/prisma/
    const sqlPath = path.join(__dirname, '../../seed_medicines.sql');

    if (!fs.existsSync(sqlPath)) {
        console.error('SQL seed file not found at:', sqlPath);
        console.log('Please run "python3 generate_seed_sql.py" in the root directory first.');
        process.exit(1);
    }

    console.log(`Reading SQL file from ${sqlPath}...`);
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    console.log(`File size: ${(sql.length / 1024 / 1024).toFixed(2)} MB`);

    console.log('Executing SQL (this might take a minute)...');
    try {
        // We used BEGIN; ... COMMIT; so it runs as a transaction.
        const result = await prisma.$executeRawUnsafe(sql);
        console.log('Seeding completed successfully. Result:', result);
    } catch (e) {
        console.error('Seeding failed:', e);
        process.exit(1);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
