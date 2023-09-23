'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import spaceBg from '@/app/_assets/_images/outer-space.svg';
import CapsuleGrid from './_components/capsule-grid';
import CapsuleSearchForm from '@/app/_components/capsule-search-form';
import { ArrowDownIcon } from '@heroicons/react/24/solid';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-4">
      <nav className="flex justify-center">
        <ul className="flex space-x-2">
          {pageNumbers.map((page) => (
            <li key={page}>
              <button
                className={`px-3 py-2 ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                } rounded-md cursor-pointer`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default function Home() {
  const [capsules, setCapsules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [filters, setFilters] = useState({
    status: '',
    serial: '',
    type: '',
  });

  const fetchCapsules = async (filters, page = 1) => {
    try {
      setIsLoading(true);
      const queryString = new URLSearchParams({ ...filters, page }).toString();
      const apiUrl = `http://localhost:3000/api/capsules?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCapsules(data?.capsules?.docs || []);
      setTotalPages(data?.capsules?.totalPages || 1); // Update total pages
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching capsules:', error);
      setIsLoading(false);
    }
  };

  // Fetch capsules when the page loads or filters change
  useEffect(() => {
    fetchCapsules(filters, page);
  }, [page, filters]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchSubmit = (filters) => {
    setFilters(filters);
    setPage(1); // Reset page to 1 when filters change
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
      <section className="relative mt-24 h-full flex flex-col text-center items-center">
        <div className="absolute inset-0 bg-white transparent transform -skew-y-2 z-10"></div>
        <div className="bg-white relative z-20 mt-24">
          <h2 className="font-semibold text-4xl">Capsules</h2>
          <p className="font-medium text-secondaryBlue mt-3 mb-12">
            Search and explore latest information about SpaceX’s capsules
          </p>
          <CapsuleSearchForm
            onSubmit={handleSearchSubmit}
            isLoading={isLoading}
          />
        </div>
        <div className="bg-transparent relative z-20 w-full pt-10 px-20 pb-10">
          <CapsuleGrid capsules={capsules} isLoading={isLoading} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
      <footer className="bg-bgBlue text-white text-center py-10">
        <p className="text-sm">
          Space Showcase. All rights reserved. &copy; Shehbaz Jafri{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
