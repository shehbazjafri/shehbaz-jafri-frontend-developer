'use client';

import { useState } from 'react';
import Image from 'next/image';
import spaceBg from '@/app/_assets/_images/outer-space.svg';
import CapsuleGrid from './_components/capsule-grid';
import CapsuleSearchForm from '@/app/_components/capsule-search-form';
import { ArrowDownIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [capsules, setCapsules] = useState([]);

  const fetchCapsules = async (filters) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const apiUrl = `http://localhost:3000/api/capsules?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCapsules(data?.capsules?.docs || []);
    } catch (error) {
      console.error('Error fetching capsules:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex justify-between items-center rounded-3xl px-32 pt-14 shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-6xl font-bold text-white">
            Welcome to the
            <br />
            <span className="text-textBlue">space showcase.</span>
          </h1>
          <p className="text-lg font-extralight text-white mt-10 w-[80%]">
            Embark on a voyage through SpaceX&rsquo;s technological wonders.
            Join us as we uncover the engineering brilliance behind these
            spacecraft, forging the path to new horizons in the cosmos.
          </p>
          <ArrowDownIcon className="text-white w-10 h-10 mt-10" />
        </div>
        <Image src={spaceBg} alt="space" className="w-[500px] h-[460px]" />
      </section>
      <section className="relative mt-24 h-screen flex flex-col text-center">
        <div className="absolute inset-0 bg-white transparent transform -skew-y-2 z-10"></div>
        <div className="bg-white relative z-20 mt-24">
          <h2 className="font-semibold text-4xl">Capsules</h2>
          <p className="font-medium text-secondaryBlue mt-3 mb-12">
            Search and explore latest information about SpaceX’s capsules
          </p>
          <CapsuleSearchForm onSubmit={fetchCapsules} />
        </div>
        <div className="bg-white relative z-20">
          <CapsuleGrid capsules={capsules} />
        </div>
      </section>
    </main>
  );
}
