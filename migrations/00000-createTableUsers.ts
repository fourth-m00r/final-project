import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  // dateRegistration: string;
  reported: boolean | null;
  gender: string | null;
  country: string | null;
  city: string | null;
  pictureUrl: string | null;
  presentation: string | null;
  languagesId: string | null;
  contactsId: number | null;
};

export type UserRegistration = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

// passwordHash must be NOT NULL at the end when I have an HASH
export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name varchar(20) NOT NULL,
      first_name varchar(20) NOT NULL,
      last_name varchar(20) NOT NULL,
      email varchar(30) NOT NULL,
      gender varchar(20),
      country varchar(20),
      city varchar(20),
      picture_url varchar(200),
      presentation varchar(300),
      languages_id integer,
      contacts_id integer,
      -- date_registration DATETIME DEFAULT CURRENT_TIMESTAMP,
      reported boolean DEFAULT FALSE,
      password_hash varchar (80) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
