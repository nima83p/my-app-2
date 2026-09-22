"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

export default function NavBar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <Container size="4">
        <Flex align="center" justify="between" className="h-16">
          <Flex align="center" gap="6">
            <Link href="/" className="shrink-0">
              <FaReact className="size-9 ml-4" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function NavLinks() {
  const pathname = usePathname();

  const Links = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/Shop" },
    { label: "Dashboard", href: "/Dashboard" },
    { label: "Issue", href: "/issue" },
  ];

  return (
    <Flex align="center" gap="1">
      {Links.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative rounded-xl px-4 py-2 text-base font-medium"
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
  );
}

function AuthStatus() {
  const { data: session, status } = useSession();

    const [showSkeleton, setShowSkeleton] = useState(true);


    useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  if (status === "loading" || showSkeleton) {
    return (
      <Skeleton
        width="2.25rem"
        height="2.25rem"
        borderRadius="9999px"
        className="mr-4"
      />
    );
  }

  return (
    <Box>
      {status === "authenticated" ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user?.image ?? undefined}
              fallback="?"
              radius="full"
              className="cursor-pointer mr-4"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content align="end" className="min-w-[300px]">
            <DropdownMenu.Label>
              <Text>{session.user?.email}</Text>
            </DropdownMenu.Label>

            <DropdownMenu.Item
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:!bg-gray-100 hover:!text-black"
            >
              Log Out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Link
          href="/login"
          className="mr-4 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Log In
        </Link>
      )}
    </Box>
  );
}
