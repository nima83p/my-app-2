"use client";

import { signOut } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              GoodBye Body
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign out of your account
            </p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full h-12 flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition cursor-pointer"
          >
            Log Out
          </button>

          <div className="flex items-center gap-4 my-7">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs text-slate-400">
              SECURE LOGOUT
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
}