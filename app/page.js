'use client';

import { useState } from 'react';
import Image from 'next/image';
import spaceBg from '@/app/_assets/_images/outer-space.svg';
import CapsuleGrid from './_components/capsule-grid';
import CapsuleSearchForm from '@/app/_components/capsule-search-form';

export default function Home() {
  const [capsules, setCapsules] = useState([]); // const data = await getCapsules();

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
    <main className="flex min-h-screen flex-col justify-between p-5">
      <section className="flex justify-between bg-skyBlue rounded-3xl p-14 shadow-sm">
        <div className="flex flex-col justify-between">
          <h1 className="text-6xl font-extrabold text-black">Space Showcase</h1>
          <p className="text-2xl font-medium text-black">
            A showcase of space exploration and tech.
          </p>
        </div>
        <Image src={spaceBg} alt="space" className="w-[500px] h-[460px]" />
      </section>
      <section className="bg-white rounded-3xl p-5 mt-4">
        <div>
          <p className="font-medium">Search Capsules</p>
          <CapsuleSearchForm onSubmit={fetchCapsules} />
        </div>
        <div>
          <CapsuleGrid capsules={capsules} />
        </div>
      </section>
    </main>
  );
}
