import { Sql } from 'postgres';

export type UserLanguages = {
  id: number;
  userId: number;
  languageId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users_languages (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer UNIQUE REFERENCES users (id),
    language_id integer UNIQUE REFERENCES languages (id)
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users_languages
  `;
}
