import { auth } from "@/auth";
import Link from "next/link";
import { CgDanger } from "react-icons/cg";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center gap-5">
      {session?.user ? (
        <div>
          <p>Welcome {session.user.name}</p>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center gap-3">
          <CgDanger size="40" color="red" />

          <p>You are not logged in, please login to Continue.</p>
          <Link href="/login" className="mt-4">
            Log In
          </Link>
        </div>
      )}
    </main>
  );
}
