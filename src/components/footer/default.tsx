import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://ait-lab.vercel.app"
            target="_blank"
            className="hover:underline"
          >
            AIT Lab
          </Link>
          . All rights reserved. | Developed by{" "}
          <Link
            href="https://github.com/gauravfs-14"
            target="_blank"
            className="hover:underline"
          >
            Gaurab Chhetri
          </Link>{" "}
          | Supported by{" "}
          <Link
            href="https://ait-lab.vercel.app"
            target="_blank"
            className="hover:underline"
          >
            AIT Lab
          </Link>
        </p>
        <ul className="flex space-x-4 mt-4 md:mt-0">
          <li>
            <Link href="/" className="text-sm hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/" className="text-sm hover:underline">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/" className="text-sm hover:underline">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
