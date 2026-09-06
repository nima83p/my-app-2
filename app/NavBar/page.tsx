'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaReact } from 'react-icons/fa'

export default function NavBar() {
  const pathname = usePathname()

  const Links = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/Shop' },
    { label: 'Dashboard', href: '/Dashboard' },
    { label: 'Issus', href: '/issue/new' }
  ]

  return (
    <nav className="flex items-center border-b border-gray-300 p-5">

      <Link href="/">
        <FaReact className="size-10" />
      </Link>

      <ul className="flex flex-1 items-center  gap-1 ml-2">

        {Links.map((item) => {
          const active = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative block rounded-xl px-5 py-2 text-lg"
              >

                {active && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute inset-0 rounded-xl bg-black"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35
                    }}
                  />
                )} 

                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    active
                      ? 'text-white'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                </span>

              </Link>
            </li>
          )
        })}

      </ul>
    </nav>
  )
}