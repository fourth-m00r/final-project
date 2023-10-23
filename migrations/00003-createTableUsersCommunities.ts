import { Sql } from 'postgres';

export type UserCommunities = {
  id: number;
  userId: number;
  communityId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users_communities (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer UNIQUE REFERENCES users (id),
    community_id integer UNIQUE REFERENCES communities (id)
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users_communities
  `;
}
