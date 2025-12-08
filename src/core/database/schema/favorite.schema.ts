import { users } from '@/core/database/schema/auth-schema';
import { sql } from 'drizzle-orm';
import {
  integer,
  pgPolicy,
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// Favorites Table
export const favorites = pgTable(
  'favorites',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(), // Reference to auth.users,
    listing_id: integer('listing_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    pgPolicy('User can view their favourites', {
      as: 'restrictive',
      to: 'authenticated',
      for: 'select',
      using: sql`(select auth.uid()) = user_id`,
    }),
    pgPolicy('User can update their own favourites', {
      as: 'restrictive',
      to: 'authenticated',
      for: 'update',
      using: sql`(select auth.uid()) = user_id`,
    }),
    pgPolicy('User can delete their own favorites', {
      as: 'permissive',
      to: 'authenticated',
      for: 'delete',
      using: sql`(select auth.uid()) = user_id`,
    }),
  ],
);
