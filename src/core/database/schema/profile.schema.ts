import { users } from '@/core/database/auth-schema';
import { sql } from 'drizzle-orm';
import {
  boolean,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

// User Profiles Table (extends auth.users)
export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id')
      .primaryKey()
      .references(() => users.id, {
        onDelete: 'cascade',
      })
      .notNull(), // Reference to auth.users
    full_name: varchar({ length: 255 }),
    avatar_url: text(),
    phone: varchar({ length: 50 }),
    email: varchar({ length: 50 }),
    bio: text(),
    is_agent: boolean().default(false),
    is_public: boolean().default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    pgPolicy('User profile can be viewed publictly', {
      as: 'restrictive',
      for: 'select',
      to: 'public',
      using: sql`is_public = true`,
    }),
    pgPolicy('User can view their own profile', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql`(select auth.uid()) = id`,
    }),
    pgPolicy('User can update their own profile', {
      as: 'permissive',
      for: 'update',
      to: authenticatedRole,
      withCheck: sql`(select auth.uid()) = id`,
      using: sql`(select auth.uid()) = id`,
    }),
    pgPolicy('User can delete their own profile', {
      as: 'permissive',
      for: 'delete',
      to: authenticatedRole,
      using: sql`(select auth.uid()) = id`,
    }),
  ],
);

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
