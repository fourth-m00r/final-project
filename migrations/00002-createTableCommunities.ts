import { Sql } from 'postgres';

export type Community = {
  id: number;
  communityName: string;
  communityDescription: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE communities (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    community_name varchar(20) NOT NULL,
    comm_description varchar(200)
);
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE communities
  `;
}
