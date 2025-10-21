import { users } from '@/core/database/schema/auth-schema';
import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

// Favorites Table
export const favorites = pgTable('favorites', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: uuid('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(), // Reference to auth.users,
  listing_id: integer('listing_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
