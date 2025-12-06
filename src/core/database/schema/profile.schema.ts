import { users } from '@/core/database/schema/auth-schema';
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// User Profiles Table (extends auth.users)
export const profiles = pgTable('profiles', {
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
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
