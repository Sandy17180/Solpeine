"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("https://abacus.jasoncameron.dev/hit/solpeine.vercel.app/visits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && typeof data.value !== "undefined") {
          setCount(data.value);
        }
      })
      .catch((err) => {
        console.warn("Visitor counter unavailable:", err?.message || err);
        if (isMounted) setCount(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <span>
      {count !== null ? count.toLocaleString() : "—"}
    </span>
  );
}
