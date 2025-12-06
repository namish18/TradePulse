/**
 * Database Initialization
 * Database setup, migrations, and seeding
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pool, query, closePool } from '../config/database.js';
import { logger } from '../middlewares/loggingMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Initialize database connection
 * @returns {Promise<void>}
 */
export async function initDatabase() {
    try {
        // Test connection
        await query('SELECT NOW()');
        logger.info('Database connection verified');
    } catch (error) {
        logger.error('Database connection failed:', error);
        throw error;
    }
}

/**
 * Run database migrations
 * @returns {Promise<void>}
 */
export async function runMigrations() {
    try {
        logger.info('Running database migrations...');

        const migrations = [
            '001_init_schema.sql',
            '002_create_hypertables.sql',
            '003_add_indexes.sql',
            '004_create_functions.sql',
        ];

        for (const migration of migrations) {
            const filePath = join(__dirname, 'migrations', migration);
            const sql = readFileSync(filePath, 'utf-8');

            logger.info(`Running migration: ${migration}`);
            await query(sql);
            logger.info(`Completed migration: ${migration}`);
        }

        logger.info('All migrations completed successfully');
    } catch (error) {
        logger.error('Migration failed:', error);
        throw error;
    }
}

/**
 * Seed database with sample data
 * @returns {Promise<void>}
 */
export async function seedDatabase() {
    try {
        logger.info('Seeding database...');

        const seeds = ['dev_seed.sql', 'sample_market_data.sql'];

        for (const seed of seeds) {
            const filePath = join(__dirname, 'seeds', seed);
            const sql = readFileSync(filePath, 'utf-8');

            logger.info(`Running seed: ${seed}`);
            await query(sql);
            logger.info(`Completed seed: ${seed}`);
        }

        logger.info('Database seeding completed');
    } catch (error) {
        logger.error('Seeding failed:', error);
        throw error;
    }
}

/**
 * Close database connection
 * @returns {Promise<void>}
 */
export async function closeDatabase() {
    await closePool();
}

// CLI support
if (import.meta.url === `file://${process.argv[1]}`) {
    const command = process.argv[2];

    switch (command) {
        case 'migrate':
            await initDatabase();
            await runMigrations();
            await closeDatabase();
            process.exit(0);
            break;

        case 'seed':
            await initDatabase();
            await seedDatabase();
            await closeDatabase();
            process.exit(0);
            break;

        case 'rollback':
            logger.error('Rollback not implemented yet');
            process.exit(1);
            break;

        default:
            logger.error('Unknown command. Use: migrate, seed, or rollback');
            process.exit(1);
    }
}

export default {
    initDatabase,
    runMigrations,
    seedDatabase,
    closeDatabase,
};
