import { Controller } from '@/core/controller';
import { PgDatabase } from '@/core/database';
import { NewProfile, profiles } from '@/core/database/schema';
import { eq } from 'drizzle-orm';

export class UserController extends Controller {
  private db: PgDatabase;
  constructor(db: PgDatabase) {
    super();
    this.db = db;
  }

  /**
   * Insert new user profile to the database
   * @param {NewProfile} data
   * @returns
   */
  async createUserProfile(data: NewProfile) {
    return this.withErrorHandler(async () => {
      if (!data.email) throw new Error('Email is required!');

      const result = await this.db.transaction(async (txs) => {
        const isExisted = await txs
          .select()
          .from(profiles)
          .where(eq(profiles.email, data.email!));
        if (isExisted.length > 0)
          throw new Error('Email is already used by another account!');

        const newProfile = await txs.insert(profiles).values(data).returning({
          id: profiles.id,
          created_at: profiles.createdAt,
        });

        return newProfile[0];
      });

      return result;
    });
  }
}
