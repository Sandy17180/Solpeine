"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function NavigationLoader({ children }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    // If pathname changed (client navigation), show loader briefly
    if (prevPathRef.current && pathname !== prevPathRef.current) {
      setIsLoading(true);
      // ensure previous timer cleared
      if (timerRef.current) clearTimeout(timerRef.current);
      // Keep loader visible long enough so each phrase is readable (~4s)
      timerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
    prevPathRef.current = pathname;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <>
      {children}

      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-3xl">
          <div className="w-full h-full flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <LoadingScreen />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
