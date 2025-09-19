import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const AdvancedCameraReel = ({
  images = [],
  speed = 20, // seconds for a full loop
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const reelRef = useRef(null);
  const [reelWidth, setReelWidth] = useState(0);

  // Default images if none provided
  const defaultImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=300&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=300&h=300&fit=crop&crop=face",
  ];

  const clientImages = images.length > 0 ? images : defaultImages;
  const duplicatedImages = [...clientImages, ...clientImages, ...clientImages];

  // measure reel width once rendered
  useEffect(() => {
    if (reelRef.current) {
      setReelWidth(reelRef.current.scrollWidth / 3); // width of one full set
    }
  }, [clientImages]);

  return (
    <div className="w-full overflow-hidden py-12 px-12">
      <div
        className="relative"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {/* Film perforations top */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-black flex items-center z-10 overflow-hidden">
          <motion.div
            className="flex space-x-3"
            animate={{ x: isPaused ? undefined : [0, -reelWidth] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: speed,
                ease: "linear",
              },
            }}
          >
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-[#F5F1EA] rounded-sm flex-shrink-0"
              ></div>
            ))}
          </motion.div>
        </div>

        {/* Main film container */}
        <div className="relative bg-black py-6 overflow-hidden">
          <motion.div
            ref={reelRef}
            className="flex items-center gap-2 px-6"
            animate={{ x: isPaused ? undefined : [0, -reelWidth] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: speed,
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative group cursor-pointer"
              >
                <div className="bg-white rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-32 h-32 relative overflow-hidden rounded-md">
                    <img
                      src={image}
                      alt={`Client ${(index % clientImages.length) + 1}`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Film perforations bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-black flex items-center z-10 overflow-hidden">
          <motion.div
            className="flex space-x-3"
            animate={{ x: isPaused ? undefined : [0,-reelWidth] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: speed,
                ease: "linear",
              },
            }}
          >
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-[#F5F1EA] rounded-sm flex-shrink-0"
              ></div>
            ))}
          </motion.div>
        </div>

        {/* Shadow effects */}
        <div className="absolute left-0 top-6 bottom-6 w-20 bg-gradient-to-r from-gray-900 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-6 bottom-6 w-20 bg-gradient-to-l from-gray-900 to-transparent z-20 pointer-events-none"></div>
      </div>

      {pauseOnHover && (
        <p className="">Hover to pause</p>
      )}
    </div>
  );
};

export default AdvancedCameraReel;
