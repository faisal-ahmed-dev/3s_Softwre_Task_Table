'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { fetchInitialData, getCompanies } from '../services/api';
import { Company, FilterParams, InitialDataResponse, CompanyResponse } from '../types/company';
import Filters from '@/components/Filters';
import Table from '@/components/Table';
import PaginationControls from '@/components/PaginationControls';
import { Plus } from 'lucide-react';

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [groups, setGroups] = useState<{ value: string; text: string }[]>([]);
  const [activeOptions, setActiveOptions] = useState<{ value: string; text: string }[]>([]);
  const [pageSizes, setPageSizes] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Start as true to show loading on initial load

  // filters: holds the values from input fields but does not trigger auto search
  const [filters, setFilters] = useState<FilterParams>({
    searchGroupId: 0,
    searchCompanyName: '',
    searchVatNumber: '',
    searchActiveId: 0,
    page: 1,
    pageSize: 15,
    availablePageSizes: [],
    draw: null,
    start: 0,
    length: 25,
  });

  // appliedFilters: these are the filters actually used in API calls.
  const [appliedFilters, setAppliedFilters] = useState<FilterParams>({
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
  });

  // Fetch initial filter data (groups, status options, page sizes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData: InitialDataResponse = await fetchInitialData();
        const { availableGroups, availableActiveOptions, availablePageSizes } = initialData.data;

        setGroups(
          availableGroups.map((group: any) => ({
            value: group.value,
            text: group.text,
          }))
        );

        setActiveOptions(
          availableActiveOptions.map((option: any) => ({
            value: option.value,
            text: option.text,
          }))
        );

        const numericPageSizes = availablePageSizes
          .map((size: any) => parseInt(size, 10))
          .filter((size: number) => !isNaN(size));

        setPageSizes(numericPageSizes);

        // Update both filters and appliedFilters with the available page sizes if needed
        setFilters(prev => ({
          ...prev,
          availablePageSizes: numericPageSizes,
        }));

        setAppliedFilters(prev => ({
          ...prev,
          availablePageSizes: numericPageSizes,
        }));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchCompaniesCallback = useCallback(async (params: FilterParams) => {
    setLoading(true);
    try {
      const response: CompanyResponse = await getCompanies(params);
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
    fetchCompaniesCallback(appliedFilters);
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
    [setFilters]
  );

  const handleSearch = useCallback(() => {
    // When user clicks search, apply the current filters to trigger a fetch
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
    // Also clear applied filters to reset table
    setAppliedFilters(clearedFilters);
  }, [filters]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const totalPages = Math.ceil(totalRecords / appliedFilters.pageSize);
      if (newPage < 1 || newPage > totalPages) return;

      // Update appliedFilters to trigger a new fetch
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

      // Update appliedFilters to trigger a new fetch with the new page size
      setAppliedFilters(prev => ({
        ...prev,
        pageSize: newSize,
        start: 0,
        page: 1,
        length: newSize,
      }));
    },
    [setAppliedFilters]
  );

  const totalPages = useMemo(() => Math.ceil(totalRecords / appliedFilters.pageSize), [totalRecords, appliedFilters.pageSize]);

  return (
    <div className="">
      <div className='flex items-center justify-between'>
          <h2 className="mb-4 text-2xl font-semibold">List of companies</h2>
          <button className='flex btn bg-secondary text-white py-1 px-2 rounded-md'><Plus className='mr-1' />Add new</button>
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

export default CompaniesPage;
