"use client";

import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { User, Dispatch} from "@prisma/client";
import Link from "next/link";

interface UserTableProps extends Dispatch{
  user: User | null;
}

export default function DisTable({ dispatch }: { dispatch: UserTableProps[] }) {
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
                Сотрудник
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
              <th scope="col" className="px-6 py-3 text-center">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {dispatch.map((u) => (
              <tr
                key={u.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.user ? u.user.surname : "нет сотрудника"}
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
                <td className="px-6 py-4 text-center">
                  <Link
                    href={`/distributions/${u.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <PencilSquareIcon className="w-4 h-4 inline-block align-middle mr-1" />{" "}
                    Редактировать
                  </Link>
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