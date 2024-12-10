import React from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Company } from "../types/company";
import { Check, Pencil, Trash2, X } from "lucide-react";
import Spinner from "./Spinner";

interface TableProps {
  companies: Company[];
  loading: boolean;
}

const Table: React.FC<TableProps> = ({
  companies,
  loading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-gray-100 text-xs font-medium text-gray-500">
          <tr>
            <th className="px-4 py-2 text-left">LOGO</th>
            <th className="px-4 py-2 text-left">NAME</th>
            <th className="px-4 py-2 text-left">GROUP</th>
            <th className="px-4 py-2 text-left">VAT NUMBER</th>
            <th className="px-4 py-2 text-left">STATUS</th>
            <th className="px-4 py-2 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center">
                <Spinner/>
              </td>
            </tr>
          ) : companies.length > 0 ? (
            companies.map((company) => (
              <tr
                key={company.id}
                className="border-b "
              >
                <td className="px-4 py-2">
                  <Image
                    src={company.logoThumbnailUrl || "/default-logo.png"}
                    alt={company.name}
                    width={50}
                    height={50}
                    className="object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{company.groupName}</td>
                <td className="px-4 py-2">{company.vatNumber}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-sm font-semibold rounded `}>
                    {company.active ? (
                      <Check className="text-green-600" />
                    ) : (
                      <X className="text-red-600" />
                    )}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-4">
                  <button className="text-gray-600 border border-gray-300 rounded-md p-1 ">
                  <Pencil size={15}/>                  
                  </button>
                  <button className="text-gray-600 border border-gray-300 rounded-md p-1">
                  <Trash2  size={15}/>                  
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Table);
