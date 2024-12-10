"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import { BsFolder } from "react-icons/bs";
import { GiMilkCarton } from "react-icons/gi";
import { AiTwotoneShop } from "react-icons/ai";
import { GrCatalogOption } from "react-icons/gr";
import { FaUserCheck } from "react-icons/fa6";
import { RiListSettingsFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:w-64 h-screen flex flex-col bg-white shadow-md">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="p-4 ml-1 text-2xl font-bold tracking-widest text-dark">
          GENPOS
        </div>

        <nav className="mt-4 text-sm flex-1">
          <ul>
            <SidebarItem
              href="/"
              label="Dashboard"
              icon={<BsFolder className="mx-3" />}
            />

            <SidebarDropdown
              icon={<GiMilkCarton className="mx-3" />}
              label="Purchase"
              links={[
                { href: "/purchase/orders", label: "Orders" },
                { href: "/purchase/invoices", label: "Invoices" },
                { href: "/purchase/suppliers", label: "Suppliers" },
              ]}
            />

            {/* Business Unit dropdown initially open and "Companies" selected */}
            <SidebarDropdown
              icon={<AiTwotoneShop className="mx-3" />}
              label="Business Unit"
              defaultOpen={true}
              defaultActiveLink="/companies"
              links={[
                { href: "/business/departments", label: "Groups" },
                { href: "/companies", label: "Companies" },
                { href: "/business/brands", label: "Brands" },
                { href: "/business/outlets", label: "Outlets" },
                { href: "/business/warehouses", label: "Warehouses" },
              ]}
            />

            <SidebarDropdown
              icon={<GrCatalogOption className="mx-3" />}
              label="Catalog"
              links={[
                { href: "/business/departments", label: "Groups" },
                { href: "/companies", label: "Companies" },
                { href: "/business/brands", label: "Brands" },
                { href: "/business/outlets", label: "Outlets" },
                { href: "/business/warehouses", label: "Warehouses" },
              ]}
            />

            <SidebarDropdown
              icon={<FaUserCheck className="mx-3" />}
              label="User"
              links={[
                { href: "/business/departments", label: "Groups" },
                { href: "/companies", label: "Companies" },
                { href: "/business/brands", label: "Brands" },
                { href: "/business/outlets", label: "Outlets" },
                { href: "/business/warehouses", label: "Warehouses" },
              ]}
            />

            <SidebarDropdown
              icon={<RiListSettingsFill className="mx-3" />}
              label="Configurations"
              links={[
                { href: "/business/departments", label: "Groups" },
                { href: "/companies", label: "Companies" },
                { href: "/business/brands", label: "Brands" },
                { href: "/business/outlets", label: "Outlets" },
                { href: "/business/warehouses", label: "Warehouses" },
              ]}
            />

            <SidebarDropdown
              icon={<IoMdSettings className="mx-3" />}
              label="System"
              links={[
                { href: "/business/departments", label: "Groups" },
                { href: "/companies", label: "Companies" },
                { href: "/business/brands", label: "Brands" },
                { href: "/business/outlets", label: "Outlets" },
                { href: "/business/warehouses", label: "Warehouses" },
              ]}
            />
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="m-2 p-1 border border-primary text-primary rounded-md flex items-center hover:bg-secondary"
        >
          <FaBars />
        </button>

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Header */}
          <div className="p-4 text-xl font-bold border-b flex justify-between items-center">
            GENPOS
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-secondary"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-4 flex-1">
            <ul>
              <SidebarItem
                href="/"
                label="Dashboard"
                icon={<BsFolder className="mx-3" />}
              />

              <SidebarDropdown
                icon={<GiMilkCarton className="mx-3" />}
                label="Purchase"
                links={[
                  { href: "/purchase/orders", label: "Orders" },
                  { href: "/purchase/invoices", label: "Invoices" },
                  { href: "/purchase/suppliers", label: "Suppliers" },
                ]}
              />

              {/* Business Unit dropdown initially open and "Companies" selected */}
              <SidebarDropdown
                icon={<AiTwotoneShop className="mx-3" />}
                label="Business Unit"
                defaultOpen={true}
                defaultActiveLink="/companies"
                links={[
                  { href: "/business/departments", label: "Groups" },
                  { href: "/companies", label: "Companies" },
                  { href: "/business/brands", label: "Brands" },
                  { href: "/business/outlets", label: "Outlets" },
                  { href: "/business/warehouses", label: "Warehouses" },
                ]}
              />

              <SidebarDropdown
                icon={<GrCatalogOption className="mx-3" />}
                label="sdsad Unit"
                links={[
                  { href: "/business/departments", label: "Groups" },
                  { href: "/companies", label: "Companies" },
                  { href: "/business/brands", label: "Brands" },
                  { href: "/business/outlets", label: "Outlets" },
                  { href: "/business/warehouses", label: "Warehouses" },
                ]}
              />

              <SidebarDropdown
                icon={<RiListSettingsFill className="mx-3" />}
                label="Configurations"
                links={[
                  { href: "/business/departments", label: "Groups" },
                  { href: "/companies", label: "Companies" },
                  { href: "/business/brands", label: "Brands" },
                  { href: "/business/outlets", label: "Outlets" },
                  { href: "/business/warehouses", label: "Warehouses" },
                ]}
              />

              <SidebarDropdown
                icon={<IoMdSettings className="mx-3" />}
                label="sdsad Unit"
                links={[
                  { href: "/business/departments", label: "Groups" },
                  { href: "/companies", label: "Companies" },
                  { href: "/business/brands", label: "Brands" },
                  { href: "/business/outlets", label: "Outlets" },
                  { href: "/business/warehouses", label: "Warehouses" },
                ]}
              />
            </ul>
          </nav>
        </div>

        {/* Background Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
