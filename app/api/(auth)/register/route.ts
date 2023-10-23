import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { registerUser, getUserByUsername } from '../../../../database/users';
import { UserRegistration } from '../../../../migrations/00000-createTableUsers';

const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
  lastName: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  userName: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  password: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(14, { message: 'Must be 14 or fewer characters long' }),
});

export type RegisterResponseBodyPost =
  | {
      user: UserRegistration;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Check if user already exist in the database
  const user = await getUserByUsername(result.data.userName);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'Username is already taken' }] },
      { status: 403 },
    );
  }

  //  At this stage you can check if the password matches the confirm password

  // 4. Hash the plain password from the user
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 5. Save the user information with the hashed password in the database
  const newUser = await registerUser(
    result.data.userName,
    result.data.firstName,
    result.data.lastName,
    result.data.email,
    passwordHash,
  );

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  // 6. Return the new user information without the password hash
  return NextResponse.json({
    user: newUser,
  });
}
