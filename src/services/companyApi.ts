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

export const getCompanies = async (
  filters: Partial<FilterParams>
): Promise<CompanyResponse> => {
  const payload = {
    searchGroupId: filters.searchGroupId ?? null,
    searchCompanyName: filters.searchCompanyName ?? null,
    searchVatNumber: filters.searchVatNumber ?? null,
    searchActiveId: filters.searchActiveId ?? null,
    page: filters.page ?? null,
    pageSize: filters.pageSize ?? null,
    availablePageSizes: filters.availablePageSizes ?? null,
    draw: filters.draw ?? null,
    start: filters.start ?? null,
    length: filters.length ?? null,
  };
  try {
    const response = await api.post<CompanyResponse>(
      "/api/Company/List",
      payload
    );
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
