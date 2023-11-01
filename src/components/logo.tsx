import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link className="w-[250px]" href={'/'}>
      <div className="items-center w-full flex flex-row gap-2">
        <Image
          alt="UIT-ESTATE"
          src="/logoEstate.png"
          width={200}
          height={200}
        />
      </div>
    </Link>
  );
}

export default Logo;
