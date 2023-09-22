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
    status: null,
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
    <form onSubmit={handleSubmit} className="flex items-center gap-x-7 py-1">
      <div className="flex flex-col items-start">
        <label
          htmlFor="status"
          className="text-secondaryBlue font-normal text-sm"
        >
          Status
        </label>
        <Select
          onValueChange={(value) => {
            setFilters({
              ...filters,
              status: value,
            });
          }}
        >
          <SelectTrigger className="w-[30rem]">
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
        <label
          htmlFor="serial"
          className="text-secondaryBlue font-normal text-sm"
        >
          Serial
        </label>
        <Input
          type="text"
          name="serial"
          placeholder="Serial"
          value={filters.serial}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-start">
        <label
          htmlFor="type"
          className="text-secondaryBlue font-normal text-sm"
        >
          Type
        </label>
        <Input
          type="text"
          name="type"
          placeholder="Type"
          value={filters.type}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="bg-textBlue text-white self-end"
        disabled={isLoading}
      >
        Search
        <MagnifyingGlassIcon className="h-5 w-5 ml-2" />
      </Button>
    </form>
  );
};

export default CapsuleSearchForm;
