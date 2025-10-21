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
  bio: text(),
  is_agent: boolean().default(false),
  company_name: varchar({ length: 255 }),
  license_number: varchar({ length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
