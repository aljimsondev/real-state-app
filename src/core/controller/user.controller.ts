import { Controller } from '@/core/controller';
import { PgDatabase } from '@/core/database';

export class UserController extends Controller {
  private db: PgDatabase;
  constructor(db: PgDatabase) {
    super();
    this.db = db;
  }
}
