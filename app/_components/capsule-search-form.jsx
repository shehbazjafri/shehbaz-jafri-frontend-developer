'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const CapsuleSearchForm = ({ onSubmit, isLoading }) => {
  const [filters, setFilters] = useState({
    status: '',
    serial: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-whitish rounded-lg px-5 py-5 lg:flex-row items-start lg:items-center gap-4"
    >
      <div className="flex flex-col items-start">
        <label htmlFor="status" className="text-textGrey font-medium text-sm">
          Status
        </label>
        <Select
          id="status"
          onValueChange={(value) => {
            setFilters({
              ...filters,
              status: value,
            });
          }}
        >
          <SelectTrigger
            className={`w-[15rem] bg-white ${
              filters?.status ? '' : 'text-gray-400'
            }`}
          >
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
            <SelectItem value="destroyed">Destroyed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="serial" className="text-textGrey font-medium text-sm">
          Serial
        </label>
        <Input
          id="serial"
          type="text"
          name="serial"
          placeholder="Serial number"
          className="placeholder:text-grey-600"
          value={filters.serial}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="type" className="text-textGrey font-medium text-sm">
          Type
        </label>
        <Input
          id="type"
          type="text"
          name="type"
          placeholder="Capsule type"
          className="placeholder:text-grey-600"
          value={filters.type}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="bg-primaryBlue text-white lg:self-end"
        disabled={isLoading}
      >
        Search
        <MagnifyingGlassIcon className="h-4 w-4 ml-2" />
      </Button>
    </form>
  );
};

export default CapsuleSearchForm;
