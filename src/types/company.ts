export interface FilterGroup {
    disabled: boolean;
    group: string | null;
    selected: boolean;
    text: string;
    value: string;
  }
  
  export interface Company {
    groupId: number;
    groupName: string;
    name: string;
    address: string;
    factoryAddress: string;
    remarks: string;
    contactNo: string;
    email: string;
    logoId: string | null;
    webURL: string;
    prefix: string;
    vatNumber: string;
    active: boolean;
    numberOfBrands: number;
    logoThumbnailUrl: string;
    locales: any[];
    availableGroups: any[];
    id: number;
  }
  
  export interface CompanyResponse {
    data: {
      data: Company[];
      draw: any;
      recordsFiltered: number;
      recordsTotal: number;
    };
    message: string | null;
    errors: any[];
    validationErrors: Record<string, any>;
  }
  
  export interface InitialDataResponse {
    data: {
      searchGroupId: number;
      searchCompanyName: string | null;
      searchVatNumber: string | null;
      searchActiveId: number;
      availableGroups: FilterGroup[];
      availableActiveOptions: FilterGroup[];
      page: number;
      pageSize: number;
      availablePageSizes: string[]; 
      draw: any;
      start: number;
      length: number;
    };
    message: string | null;
    errors: any[];
    validationErrors: Record<string, any>;
  }
  
  export interface FilterParams {
    searchGroupId: number;
    searchCompanyName: string | null;
    searchVatNumber: string | null;
    searchActiveId: number;
    page: number;
    pageSize: number;
    availablePageSizes: string[];
    draw: any;
    start: number;
    length: number;
  }
  