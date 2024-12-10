import { fetchInitialData, getCompanies } from "../services/companyApi";
import Companies from "../pages/Companies";
import { Company } from "../types/company";

export default async function CompaniesPage() {
  const initialData = await fetchInitialData();
  const { availableGroups, availableActiveOptions, availablePageSizes,
          searchGroupId, searchCompanyName, searchVatNumber, searchActiveId,
          page, pageSize, draw, start, length } = initialData.data;

  const groups = availableGroups.map((group: any) => ({
    value: group.value,
    text: group.text,
  }));

  const activeOptions = availableActiveOptions.map((option: any) => ({
    value: option.value,
    text: option.text,
  }));

  const numericPageSizes = availablePageSizes
    .map((size: any) => parseInt(size, 10))
    .filter((size: number) => !isNaN(size));

  const initialFilters = {
    searchGroupId,
    searchCompanyName,
    searchVatNumber,
    searchActiveId,
    page,
    pageSize,
    availablePageSizes,
    draw,
    start,
    length,
  };

  const initialCompaniesResponse = await getCompanies(initialFilters);
  const initialCompanies: Company[] = initialCompaniesResponse.data.data;
  const totalRecords = initialCompaniesResponse.data.recordsTotal;

  return (
    <div>
      <Companies
        initialGroups={groups}
        initialActiveOptions={activeOptions}
        initialPageSizes={numericPageSizes}
        initialCompanies={initialCompanies}
        initialTotalRecords={totalRecords}
        initialFilters={initialFilters} 
      />
    </div>
  );
}
