"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-64px)]  flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to Issue Tracker
            </p>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z"
              />
              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.5Z"
              />
              <path
                fill="#FBBC05"
                d="M6.53 13.59A5.85 5.85 0 0 1 6.22 12c0-.55.1-1.08.31-1.59V7.88H3.28A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.12l3.25-2.53Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.5 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.72 5.38l3.25 2.53C7.3 8.1 9.46 6.38 12 6.38Z"
              />
            </svg>

            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-7">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs text-slate-400">
              SECURE LOGIN
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-xs text-slate-400 leading-5">
            By continuing, you agree to the terms and privacy policy of
            Issue Tracker.
          </p>
        </div>
      </div>
    </main>
  );
}
