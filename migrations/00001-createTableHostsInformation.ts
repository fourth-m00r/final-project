import { Sql } from 'postgres';

export type HostInformation = {
  id: number;
  available: boolean;
  city: string | null;
  lastMinute: boolean | null;
  openToMeet: boolean | null;
  privateRoom: boolean | null;
  bed: boolean | null;
  haveAnimals: boolean | null;
  hostAnimals: boolean | null;
  pastGuests: number | null;
  reviews: number | null;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE hosts_information (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      available boolean DEFAULT TRUE,
      city varchar(20),
      last_minute boolean,
      open_to_meet boolean,
      private_room boolean,
      bed boolean,
      have_animals boolean,
      host_animals boolean,
      past_guests integer,
      reviews integer,
      user_id integer UNIQUE REFERENCES users (id)
      );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE hosts_information
  `;
}
