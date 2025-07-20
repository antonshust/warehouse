import { auth } from "~/server/auth";
import { db } from "~/server/db";
import SuppliersTable from "../_components/suppliers/suppliersTable";
import { AddSup } from "../_components/suppliers/addSup";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Поставщики</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Вы не авторизованы.</p>
      </div>
    );
  }

  // Получение всех пользователей из базы данных
  const suppliers = await db.supplier.findMany();

  // Если нужно, можете дополнительно фильтровать или сортировать пользователей

  return (
  <>
     <div className="flex justify-center mb-8">
        <div className="w-full max-w-md">
          <AddSup />
        </div>
      </div>

    <div className="max-w-4xl mx-auto px-6 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Поставщики</h1>
      <SuppliersTable suppliers={suppliers} />
    </div>
  </>
   
  );
}