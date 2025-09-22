"use client"

import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import Link from "next/link";

import logo from '@images/freshcart-logo.svg'
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import { CiHeart, CiShoppingCart  } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";


export default function MyNavbar() {

  const session = useSession();

  return (
    <Navbar rounded className="bg-gray-300 dark:bg-gray-300 py-4 fixed z-50 left-0 right-0">
      <NavbarBrand>
        <Link href={'/'}>
          <Image src={logo} alt="Fresh Cart" />
        </Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>

        <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/'}>Home</Link>

        <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/products'}>Products</Link>

        <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/brands'}>Brands</Link>

        <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/categories'}>Categories</Link>

        {session.status == 'unauthenticated' && <>

          <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/login'}>Login</Link>

          <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/register'}>Register</Link>
        </>}

        {session.status == 'authenticated' && <>
        
          <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0 flex items-center gap-1" href={'/wishlist'}> <p>WishList</p> <CiHeart /></Link>

          <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/allorders'}>All Orders</Link>

          <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0 flex items-center gap-1" href={'/cart'}> <p>Cart</p>  <CiShoppingCart /></Link>


          <Link className="hover:text-green-500 mx-auto pb-3 md:pb-0" href={'/profile'}><CgProfile className="text-2xl" /></Link>


          <span onClick={() => signOut({ redirect: true, callbackUrl: '/' })} className="hover:text-green-500 cursor-pointer mx-auto pb-3 md:pb-0">Logout</span>
        </>}

      </NavbarCollapse>
    </Navbar>
  );

}




