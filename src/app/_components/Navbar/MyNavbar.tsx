"use client"

import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import Link from "next/link";

import logo from '@images/freshcart-logo.svg'
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function MyNavbar() {
  return (
    <Navbar  rounded className="bg-gray-300 dark:bg-gray-300 py-4">
      <NavbarBrand>
        <Link href={'/'}>
          <Image src={logo} alt="Fresh Cart" />
        </Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse >

        <Link className="hover:text-green-500" href={'/'}>Home</Link>

        <Link className="hover:text-green-500" href={'/products'}>Products</Link>

        <Link className="hover:text-green-500" href={'/login'}>Login</Link>

        <Link className="hover:text-green-500" href={'/register'}>Register</Link>

        <Link className="hover:text-green-500" href={'/profile'}>Profile</Link>

        <span onClick={() => signOut() } className="hover:text-green-500 cursor-pointer">Logout</span>

      </NavbarCollapse>
    </Navbar>
  );

}




