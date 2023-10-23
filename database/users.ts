import { cache } from 'react';
import { sql } from '../database/connect';
import { User, UserRegistration } from '../migrations/00000-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const createUser = cache(
  async (
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    // dateRegistration: string,
    reported: boolean,
    gender?: string,
    country?: string,
    city?: string,
    pictureUrl?: string,
    presentation?: string,
    languagesId?: string,
    contactsId?: number,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
        (user_name, first_name, last_name, email, gender, country, city, picture_url, presentation, languages_id, contacts_id, /*date_registration*/, reported, password_hash)
      VALUES
        (${userName.toLowerCase()}, ${firstName}, ${lastName}, ${email}, ${
      gender || ''
    }, ${country || ''}, ${city || ''}, ${pictureUrl || ''}, ${
      presentation || ''
    }, ${languagesId || ''}, ${contactsId || ''}, /*${dateRegistration},*/ ${
      reported || ''
    }, ${passwordHash})
      RETURNING
        id,
        user_name
    `;

    return user;
  },
);

export const registerUser = cache(
  async (
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
  ) => {
    const [user] = await sql<UserRegistration[]>`
      INSERT INTO users
        (user_name, first_name, last_name, email, password_hash)
      VALUES
        (${userName.toLowerCase()}, ${firstName}, ${lastName}, ${email}, ${passwordHash})
      RETURNING
        id,
        user_name
    `;

    return user;
  },
);

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT * FROM users
  `;
  return users;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;

  return user;
});

export const updateUserById = cache(
  async (
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    // dateRegistration: string,
    reported: boolean,
    gender?: string,
    country?: string,
    city?: string,
    pictureUrl?: string,
    presentation?: string,
    languagesId?: string,
    contactsId?: number,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE
        users
      SET
        user_name = ${userName.toLowerCase()},
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        gender = ${gender || ''},
        country = ${country || ''},
        city = ${city || ''},
        picture_url = ${pictureUrl || ''},
        presentation = ${presentation || ''},
        languages_id = ${languagesId || ''},
        contacts_id = ${contactsId || ''},
        -- date_registration = ${dateRegistration},
        reported = ${reported || ''},
        password_hash = ${passwordHash},
      WHERE id = ${id}
      RETURNING *
    `;
    return user;
  },
);

export const getUserByUsername = cache(async (userName: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      user_name
    FROM
      users
    WHERE
      user_name = ${userName.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (userName: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      user_name = ${userName.toLowerCase()}
  `;
    return user;
  },
);
