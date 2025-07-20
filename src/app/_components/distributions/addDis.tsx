"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { createDis } from "~/app/api/action/distributions"; // предполагается, что есть API для добавления пользователя

export function AddDis() {
  const [user, setUser] = useState<any[]>([]);
  const [material, setMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/action/employees", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Ошибка при получении пользователя:", errorText);
          throw new Error(`Ошибка при получении пользователя: ${response.status} ${response.statusText}`);
        }

        const employees = await response.json();
        setUser(employees);
      } catch (error) {
        console.error("Ошибка при получении поставщика:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("material", material);
    formData.append("quantity", quantity);
    formData.append("date", date);
    try {
      await createDis(formData);
      resetForm();
    } catch (error) {
      console.error("Ошибка при добавлении поставки:", error);
    }
  };

  const resetForm = () => {
    setUserId("");
    setMaterial("");
    setQuantity("");
    setDate("");
  };
return (
    <div className="mb-8">
      <details className={`collapse bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700 ${isOpen ? 'open' : ''}`}>
        <summary
          className="collapse-title text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center px-6 py-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 text-blue-500" />
          Зарегистрировать выдачу
        </summary>
        {isOpen && (
          <form className="collapse-content p-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="userId" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-bold">Сотрудник</label>
                <select
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Выберите сотрудника</option>
                  {user.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.surname}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="material" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-bold">Материал</label>
                <input
                  type="text"
                  id="material"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  required
                  className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-bold">Количество</label>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-bold">Дата</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Добавить
              </button>
            </div>
          </form>
        )}
      </details>
    </div>
  );
}