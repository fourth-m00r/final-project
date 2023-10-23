import React from 'react';
import Login from '../(auth)/login/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import Theme from './ThemeSwitch';

export default function Header() {
  return (
    <header className="header header-center bg-base-200 text-base-content rounded Text Size 2">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link className="normal-case text-xl" href="/">
            <Image
              src="./logo-no-background.svg"
              alt="logo"
              width="80"
              height="80"
            />
          </Link>
          <div className="dropdown">
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/about">About the Project</Link>
              </li>
              <li>
                <Link href="/howitworks">How it works</Link>
              </li>
              <li>
                <a>Communities</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/safety">Safety Tips</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/about">About the Project</Link>
            </li>
            <li>
              <Link href="/howitworks">How it works</Link>
            </li>
            <li>
              <details>
                <summary>Communities</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/safety">Safety Tips</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end p-5">
          <Login />
        </div>
        <Theme />
      </div>
    </header>
  );
}
