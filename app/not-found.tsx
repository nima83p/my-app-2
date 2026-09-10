"use client";

import Link from "next/link";
import { FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setPos({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const move = (factor: number) => ({
    transform: `translate3d(${pos.x * factor}px, ${pos.y * factor}px, 0)`,
  });

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#f7f7f5] text-[#111]"
    >

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl transition-transform duration-300 ease-out"
        style={move(15)}
      />

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="text-xl font-black tracking-[-0.08em]"
        >
          N<span className="text-black/30">.</span>
        </Link>

        <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/40">
          Error / 404
        </div>
      </header>

      {/* Main */}
      <section className="relative z-10 flex min-h-screen items-center px-6 py-28 sm:px-10">

        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT */}
          <div
            className="transition-transform duration-300 ease-out"
            style={move(6)}
          >

            <div className="mb-10 flex items-center gap-3">
              <span className="h-px w-12 bg-black" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/50">
                Lost somewhere
              </span>
            </div>

            <h1 className="max-w-4xl text-[clamp(70px,11vw,170px)] font-black leading-[0.78] tracking-[-0.09em]">
              Oops.
              <br />
              <span className="text-black/15">
                Wrong
              </span>
              <br />
              <span>place.</span>
            </h1>

            <div className="mt-12 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">

              <p className="max-w-sm text-sm leading-7 text-black/50">
                The page you were looking for couldn't be found.
                Maybe the link is broken, or maybe it simply
                decided to disappear.
              </p>

              <Link
                href="/"
                className="group flex w-fit items-center gap-4 border-b border-black pb-3 text-sm font-bold"
              >
                <span>Go back home</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <FaArrowUpRightFromSquare className="text-[11px]" />
                </span>
              </Link>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative mx-auto h-[460px] w-full max-w-[430px]">

            {/* Shadow */}
            <div
              className="absolute bottom-8 left-1/2 h-16 w-64 -translate-x-1/2 rounded-full bg-black/10 blur-3xl transition-transform duration-300 ease-out"
              style={move(10)}
            />

            {/* Main glass card */}
            <div
              className="absolute left-1/2 top-1/2 h-[330px] w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-[7deg] rounded-[36px] border border-black/10 bg-white/70 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl transition-transform duration-300 ease-out"
              style={{
                transform: `translate(-50%, -50%) rotate(7deg) translate3d(${pos.x * 18}px, ${pos.y * 18}px, 0)`,
              }}
            >

              <div className="flex h-full flex-col justify-between rounded-[27px] bg-black p-7 text-white">

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                    STATUS
                  </span>

                  <span className="h-2 w-2 rounded-full bg-white" />
                </div>

                <div>
                  <p className="text-[90px] font-black leading-none tracking-[-0.1em]">
                    404
                  </p>

                  <div className="mt-5 h-px w-full bg-white/10" />

                  <p className="mt-4 text-xs leading-5 text-white/40">
                    Nothing exists here.
                    <br />
                    Try another direction.
                  </p>
                </div>

              </div>
            </div>

            {/* Floating mini card */}
            <div
              className="absolute right-0 top-10 rotate-[-8deg] rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-xl transition-transform duration-300 ease-out"
              style={{
                transform: `rotate(-8deg) translate3d(${pos.x * -25}px, ${pos.y * -25}px, 0)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs text-white">
                  ?
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                    Where
                  </p>
                  <p className="text-xs font-bold">
                    Are we?
                  </p>
                </div>
              </div>
            </div>

            {/* Floating arrow */}
            <div
              className="absolute bottom-12 left-0 flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white shadow-lg transition-transform duration-300 ease-out"
              style={move(-30)}
            >
              <FaArrowLeft className="text-sm" />
            </div>

            {/* Decorative crosses */}
            <span
              className="absolute left-14 top-5 text-xl text-black/20 transition-transform duration-300 ease-out"
              style={move(35)}
            >
              +
            </span>

            <span
              className="absolute bottom-20 right-12 text-2xl text-black/20 transition-transform duration-300 ease-out"
              style={move(-40)}
            >
              ✦
            </span>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 flex justify-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.45em] text-black/25">
          Nothing here · 404
        </p>
      </footer>

    </main>
  );
}