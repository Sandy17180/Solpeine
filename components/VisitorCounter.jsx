"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("https://abacus.jasoncameron.dev/hit/solpiene.vercel.app/visits")
      .then((res) => res.json())
      .then((data) => setCount(data.value))
      .catch((err) => console.error("Error fetching visitor count:", err));
  }, []);

  return (
    <div className="">
      {count !== null ? `${count}` : "Loading..."}
    </div>
  );
}
