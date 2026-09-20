"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

export default function NavBar() {
  const pathname = usePathname();

  const Links = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/Shop" },
    { label: "Dashboard", href: "/Dashboard" },
    { label: "Issue", href: "/issue" },
  ];

  const { status } = useSession();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <Container size="4">
        <Flex align="center" justify="between" className="h-16">
          <Flex align="center" gap="6">
            <Link href="/" className="shrink-0">
              <FaReact className="size-9 ml-4" />
            </Link>

            <Flex align="center" gap="1">
              {Links.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative rounded-xl px-4 py-2 text-l font-medium"
                  >
                    {active && (
                      <motion.span
                        layoutId="activeLink"
                        className="absolute inset-0 rounded-xl bg-black"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 ${
                        active ? "text-white" : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </Flex>
          </Flex>

          <Box>
            {status === "authenticated" ? (
              <Link
                href="/logout"
                className="mr-4 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/login"
                className="mr-4 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Log In
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
