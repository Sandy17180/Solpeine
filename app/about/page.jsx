import React from 'react'
import { Taprom, Lato } from 'next/font/google';
import Image from 'next/image';

const taprom = Taprom({ subsets: ['latin'], weight: '400' });
const lato = Lato({ subsets: ['latin'], weight: '400' });
const page = () => {
  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full flex z-0">
        <div className="w-2/3 bg-base"></div>
        <div className="w-1/3 bg-[#D94A27]"></div>
      </div>

      {/* Foreground content */}
      <div className="relative max-w-[657px] items-start mx-auto py-16 z-10">
        <div className="flex flex-col ">
          <Image src="/name.svg" height={6} width={760} />
          <p
            className={`${taprom.className} text-2xl text-[#d94a27] w-[614px]`}
          >
            Your friendly neighborhood photographer
          </p>
        </div>
        <div className='flex flex-col mt-8 gap-4'>
          <p>
            What began as a simple summer pastime at the age of eight - a gift
            from my grandfather in the form of a film camera - quickly revealed
            my innate love for capturing landscapes. Life eventually led me down
            the familiar paths of education and responsibilities, placing my
            passion on hold but never extinguishing it.
          </p>
          <p>
            Years later, with a basic DSLR, I rekindled that spark, falling
            deeply in love with candid moments and portraiture. Today Solpeine
            reflects my craft, resilience, and enduring devotion to storytelling
            through light.
          </p>
          <p>
            I am drawn to clients who are equally passionate about the craft and
            who appreciate the beauty of capturing the essence of the moment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page