'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        userName,
        firstName,
        lastName,
        email,
        password,
      }),
    });

    console.log('response POST: ', response);

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.userName}`);
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            className="card-body"
            onSubmit={async (event) => await handleRegister(event)}
          >
            <h4 className="mb-5 text-2xl font-bold">Join OpenTribe</h4>
            <div className="form-control">
              <label className="label">
                <span className="label-text p-3">First Name</span>
                <input
                  type="First Name"
                  value={firstName}
                  className="input input-bordered"
                  onChange={(event) => {
                    setFirstName(event.currentTarget.value);
                  }}
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text p-3">Last Name</span>
                <input
                  type="Last Name"
                  value={lastName}
                  className="input input-bordered"
                  onChange={(event) => {
                    setLastName(event.currentTarget.value);
                  }}
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text p-3">Email</span>
                <input
                  type="email"
                  value={email}
                  className="input input-bordered"
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text p-3">Username</span>
                <input
                  type="username"
                  value={userName}
                  className="input input-bordered"
                  onChange={(event) => {
                    setUserName(event.currentTarget.value);
                  }}
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text p-3">Password</span>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                  required
                />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign up</button>
            </div>
            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                Error: {error.message}
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
