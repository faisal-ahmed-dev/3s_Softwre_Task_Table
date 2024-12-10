// src/utils/api.ts

import axios, { AxiosError } from "axios";
import {
  CompanyResponse,
  FilterParams,
  InitialDataResponse,
} from "../types/company";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json-patch+json",
    accept: "*/*",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

// Axios Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error);
    return Promise.reject(error.response?.data || error.message);
  }
);

// Fetch initial filter options via GET request
export const fetchInitialData = async (): Promise<InitialDataResponse> => {
  try {
    const response = await api.get<InitialDataResponse>("/api/Company/List");
    return response.data;
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `API Error: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error("Unexpected error occurred");
  }
};

// Fetch company list via POST request with filters
export const getCompanies = async (
  filters: FilterParams
): Promise<CompanyResponse> => {
  const payload = {
    searchGroupId: filters.searchGroupId,
    searchCompanyName: filters.searchCompanyName,
    searchVatNumber: filters.searchVatNumber,
    searchActiveId: filters.searchActiveId,
    page: filters.page,
    pageSize: filters.pageSize,
    availablePageSizes: filters.availablePageSizes,
    draw: filters.draw,
    start: filters.start,
    length: filters.length,
  };
  try {
    const response = await api.post<CompanyResponse>("/api/Company/List", payload);
    return response.data;
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `API Error: ${error.response?.data?.message || error.message}`
      );
    }
    throw new Error("Unexpected error occurred");
  }
};
