'use client'

import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";

import logo from '@images/freshcart-logo.svg'
import  Link  from 'next/link';
import  Image  from 'next/image';

export default function MyFooter() {
  return (
    <Footer  className="p-3 pt-5 bg-gray-300">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link href={'/'} >
          <Image src={logo}  alt="Fresh Cart"/>
          </Link>
          <FooterLinkGroup className="flex gap-4">

          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright by="Asran" year={2025} />
      </div>
    </Footer>
  )
}
