"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function SuccessModal({ show, onClose, message }) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[90%] sm:max-w-sm bg-white rounded-2xl shadow-xl px-6 py-8 text-center"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl rounded-full transition-colors duration-200 ease-in-out cursor-pointer "
              type="button"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-4"
            >
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Success!</h3>
            <p className="text-sm text-gray-600">
              {message ||
                "Your inquiry has been submitted successfully. We’ll get back to you soon."}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
