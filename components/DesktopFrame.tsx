"use client";

/**
 * Декоративная «фоторамка» на десктопе.
 * На мобильных скрыта. На md+ создаёт чувство объёмной сцены вокруг узкой колонки:
 *   — мягкие крупные боке по бокам;
 *   — тонкая золотая рамка и уголки вокруг центральной области.
 */
export function DesktopFrame() {
  return (
    <>
      {/* Крупные размытые цветовые пятна — только на десктопе */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden md:block overflow-hidden"
      >
        <div
          className="absolute left-[6%] top-[12%] h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(192,66,87,0.22), transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute right-[4%] top-[40%] h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(217,182,121,0.18), transparent 70%)",
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute left-[14%] bottom-[-8%] h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,165,184,0.16), transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Золотая рамка вокруг колонки */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5] hidden md:flex items-stretch justify-center"
      >
        <div
          className="relative my-6 w-full max-w-[500px] mx-6 rounded-[26px]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(217,182,121,0.32), 0 40px 120px -40px rgba(0,0,0,0.9), inset 0 0 60px rgba(192,66,87,0.08)",
          }}
        >
          {/* Уголки-орнаменты */}
          <Corner className="absolute -top-2 -left-2" />
          <Corner className="absolute -top-2 -right-2 scale-x-[-1]" />
          <Corner className="absolute -bottom-2 -left-2 scale-y-[-1]" />
          <Corner className="absolute -bottom-2 -right-2 scale-[-1]" />
        </div>
      </div>
    </>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M2 2 L14 2 M2 2 L2 14"
        stroke="rgba(217,182,121,0.75)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="14.5" cy="2" r="1.2" fill="rgba(217,182,121,0.9)" />
      <circle cx="2" cy="14.5" r="1.2" fill="rgba(217,182,121,0.9)" />
      <path
        d="M5 2 L5 5 M2 5 L5 5"
        stroke="rgba(232,165,184,0.5)"
        strokeWidth="0.6"
      />
    </svg>
  );
}
