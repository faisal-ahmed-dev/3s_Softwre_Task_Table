'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getCompanies } from '../services/api';
import { Company, FilterParams } from '../types/company';
import Filters from '@/components/ui/Filters';
import Table from '@/components/ui/Table';
import PaginationControls from '@/components/ui/Pagination';
import { Plus } from 'lucide-react';

interface CompaniesProps {
  initialGroups: { value: string; text: string }[];
  initialActiveOptions: { value: string; text: string }[];
  initialPageSizes: number[];
  initialCompanies: Company[];
  initialTotalRecords: number;
}

const Companies: React.FC<CompaniesProps> = ({
  initialGroups,
  initialActiveOptions,
  initialPageSizes,
  initialCompanies,
  initialTotalRecords
}) => {
  // Initialize state with server-provided data
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [totalRecords, setTotalRecords] = useState<number>(initialTotalRecords);
  const [groups, setGroups] = useState<{ value: string; text: string }[]>(initialGroups);
  const [activeOptions, setActiveOptions] = useState<{ value: string; text: string }[]>(initialActiveOptions);
  const [pageSizes, setPageSizes] = useState<number[]>(initialPageSizes);
  const [loading, setLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterParams>({
    searchGroupId: 0,
    searchCompanyName: '',
    searchVatNumber: '',
    searchActiveId: 0,
    page: 1,
    pageSize: 25,
    availablePageSizes: initialPageSizes,
    draw: null,
    start: 0,
    length: 25,
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterParams>({
    searchGroupId: 0,
    searchCompanyName: '',
    searchVatNumber: '',
    searchActiveId: 0,
    page: 1,
    pageSize: 25,
    availablePageSizes: initialPageSizes,
    draw: null,
    start: 0,
    length: 25,
  });

  const fetchCompaniesCallback = useCallback(async (params: FilterParams) => {
    setLoading(true);
    try {
      const response = await getCompanies(params);
      setCompanies(response.data.data);
      setTotalRecords(response.data.recordsTotal);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch companies whenever appliedFilters change
  useEffect(() => {
    if (appliedFilters !== null) {
      fetchCompaniesCallback(appliedFilters);
    }
  }, [appliedFilters, fetchCompaniesCallback]);

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      const numericFields = ['searchGroupId', 'searchActiveId'];
      const isNumeric = numericFields.includes(name);
      setFilters(prev => ({
        ...prev,
        [name]: isNumeric ? (value === '' ? 0 : parseInt(value, 10)) : value,
      }));
    },
    []
  );

  const handleSearch = useCallback(() => {
    // Apply current filters
    setAppliedFilters({
      ...filters,
      page: 1,
      start: 0,
      length: filters.pageSize,
    });
  }, [filters]);

  const handleClear = useCallback(() => {
    const clearedFilters: FilterParams = {
      searchGroupId: 0,
      searchCompanyName: '',
      searchVatNumber: '',
      searchActiveId: 0,
      page: 1,
      pageSize: 25,
      availablePageSizes: [15, 25, 50, 100],
      draw: null,
      start: 0,
      length: 25,
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const totalPages = Math.ceil(totalRecords / appliedFilters.pageSize);
      if (newPage < 1 || newPage > totalPages) return;

      setAppliedFilters(prev => ({
        ...prev,
        page: newPage,
        start: (newPage - 1) * prev.pageSize,
        length: prev.pageSize,
      }));
    },
    [appliedFilters.pageSize, totalRecords]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      if (isNaN(newSize)) return;

      setAppliedFilters(prev => ({
        ...prev,
        pageSize: newSize,
        start: 0,
        page: 1,
        length: newSize,
      }));
    },
    []
  );

  const totalPages = useMemo(() => Math.ceil(totalRecords / appliedFilters.pageSize), [totalRecords, appliedFilters.pageSize]);

  return (
    <div className="">
      <div className='flex items-center justify-between'>
        <h2 className="mb-4 text-2xl font-semibold">List of companies</h2>
        <button className='flex btn bg-secondary text-white py-1 px-2 rounded-md'>
          <Plus className='mr-1' />
          Add new
        </button>
      </div>
      <Filters
        groups={groups}
        activeOptions={activeOptions}
        filters={filters}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <div className="mt-6 bg-white rounded shadow">
        <Table companies={companies} loading={loading} />
        <PaginationControls
          start={appliedFilters.start}
          length={companies.length}
          totalRecords={totalRecords}
          page={appliedFilters.page}
          pageSize={appliedFilters.pageSize}
          pageSizes={pageSizes}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Companies;
