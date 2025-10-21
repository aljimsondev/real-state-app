import { users } from '@/core/database/schema/auth-schema';
import {
  boolean,
  decimal,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Enums for better type safety
export const propertyTypeEnum = pgEnum('property_type', [
  'house',
  'apartment',
  'condo',
  'townhouse',
  'land',
  'commercial',
  'industrial',
]);

export const listingStatusEnum = pgEnum('listing_status', [
  'active',
  'pending',
  'sold',
  'rented',
  'inactive',
]);

export const listingCategoryEnum = pgEnum('listing_category', [
  'sale',
  'rent',
  'lease',
]);

export const listing = pgTable('listing', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  // Basic Information
  listing_name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  user_id: uuid('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(), // Reference to auth.users

  // Property Details
  property_type: propertyTypeEnum('property_type').notNull(),
  category: listingCategoryEnum('category').notNull(), // sale or rent
  status: listingStatusEnum('status').notNull().default('active'),

  // Location
  address: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 100 }).notNull(),
  state: varchar({ length: 100 }),
  country: varchar({ length: 100 }).notNull().default('Philippines'),
  postal_code: varchar({ length: 20 }),
  geolocation: jsonb('geolocation').default({
    lat: 0,
    lng: 0,
  }),

  // Pricing
  price: decimal({ precision: 15, scale: 2 }).notNull(), // Changed to decimal for accurate pricing
  currency: varchar({ length: 10 }).notNull().default('PHP'),
  price_per_sqm: decimal({ precision: 10, scale: 2 }),

  // Property Specifications
  bedrooms: integer(),
  bathrooms: decimal({ precision: 3, scale: 1 }), // Allows for 2.5 bathrooms
  floor_area: decimal({ precision: 10, scale: 2 }), // in square meters
  lot_area: decimal({ precision: 10, scale: 2 }), // in square meters
  parking_spaces: integer().default(0),
  floors: integer(),
  year_built: integer(),

  // Features & Amenities
  features: jsonb('features').default([]), // ['pool', 'gym', 'security', etc.]
  amenities: jsonb('amenities').default([]),

  // Media
  images: jsonb('images').default([]), // Array of image URLs
  video_tour_url: varchar({ length: 500 }),
  virtual_tour_url: varchar({ length: 500 }),

  // Additional Information
  is_featured: boolean().default(false),
  is_verified: boolean().default(false),
  view_count: integer().default(0),
  favorite_count: integer().default(0),

  // Contact Information
  contact_name: varchar({ length: 255 }),
  contact_phone: varchar({ length: 50 }),
  contact_email: varchar({ length: 255 }),

  // SEO & Marketing
  slug: varchar({ length: 300 }).unique(), // URL-friendly version of listing_name
  meta_title: varchar({ length: 255 }),
  meta_description: text(),

  // Timestamps
  published_at: timestamp('published_at'),
  expires_at: timestamp('expires_at'), // For limited-time listings
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Indexes for better query performance

// CREATE INDEX idx_listing_user_id ON listing(user_id);
// CREATE INDEX idx_listing_status ON listing(status);
// CREATE INDEX idx_listing_category ON listing(category);
// CREATE INDEX idx_listing_city ON listing(city);
// CREATE INDEX idx_listing_property_type ON listing(property_type);
// CREATE INDEX idx_listing_price ON listing(price);
// CREATE INDEX idx_listing_created_at ON listing(created_at DESC);
