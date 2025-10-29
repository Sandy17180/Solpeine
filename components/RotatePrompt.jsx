"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RotatePrompt = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        const isMobile = window.innerWidth <= 768;
        const isLandscape =
          window.matchMedia &&
          window.matchMedia("(orientation: landscape)").matches;
        const dismissed = sessionStorage.getItem("rotate_prompt_dismissed");
        setShow(Boolean(isMobile && isLandscape && !dismissed));
      } catch {
        setShow(false);
      }
    };

    check();

    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    const mq = window.matchMedia(
      "(orientation: landscape) and (max-width: 768px)"
    );
    if (mq?.addEventListener) mq.addEventListener("change", check);
    else if (mq?.addListener) mq.addListener(check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
      if (mq?.removeEventListener) mq.removeEventListener("change", check);
      else if (mq?.removeListener) mq.removeListener(check);
    };
  }, []);

  if (!show) return null;

  const handleClose = (persist = false) => {
    if (persist) sessionStorage.setItem("rotate_prompt_dismissed", "1");
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => handleClose(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 max-w-sm w-full bg-white rounded-lg shadow-lg p-6 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Updated SVG animation */}
          <div>
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="84"
              height="84"
              stroke="#000000"
              strokeWidth="0.00032"
              aria-hidden="true"
            >
              <path
                d="M24,23c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S24.552,23,24,23z 
         M24.64,30.64h-5.28V27h-0.72v3.64H1.36V17.36H15v-0.72H1
         c-0.199,0-0.36,0.161-0.36,0.36v14c0,0.199,0.161,0.36,0.36,0.36h24
         c0.199,0,0.36-0.161,0.36-0.36v-4h-0.72V30.64z 
         M4.36,13c0-4.213,3.427-7.64,7.64-7.64h1.131l-2.385,2.386l0.509,0.509L14.509,5
         l-3.255-3.254l-0.509,0.509l2.385,2.386H12
         c-4.61,0-8.36,3.75-8.36,8.36v2h0.72V13z 
         M31.36,1v24c0,0.199-0.161,0.36-0.36,0.36H17
         c-0.199,0-0.36-0.161-0.36-0.36V1c0-0.199,0.161-0.36,0.36-0.36h14
         C31.199,0.64,31.36,0.801,31.36,1z 
         M30.64,19.36H17.36v5.279h13.28V19.36z 
         M30.64,1.36H17.36v17.28h13.28V1.36z"
              />
              <rect fill="none" width="32" height="32" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold">Please rotate your phone</h3>
          <p className="text-sm text-gray-600">
            For the best experience on small screens, rotate your device back to
            portrait mode.
          </p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => handleClose(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
            <button
              onClick={() => handleClose(true)}
              className="px-4 py-2 bg-[#453b29] text-white rounded"
            >
              Don’t show again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatePrompt;
