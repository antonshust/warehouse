"use client";

import React, { useState, useEffect } from "react";
import type { Supplier, Supply} from "@prisma/client";

interface UserTableProps extends Supply{
  supplier: Supplier | null;
}

export default function SupplyTable({ supply }: { supply: UserTableProps[] }) {
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      {isClient ? (
        <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Поставщик
              </th>
              <th scope="col" className="px-6 py-3">
                Материал
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Колличество
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Дата
              </th>
            </tr>
          </thead>
          <tbody>
            {supply.map((u) => (
              <tr
                key={u.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.supplier ? u.supplier.name : "нет поставщика"}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.material}
                </td>
                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.quantity}
                </td>
                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.date ? new Date(u.date).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div> 
      )}
    </div>
  );
}