import { auth } from "~/server/auth";
import { db } from "~/server/db";
import MaterialsTable from "../_components/materials/materialsTable";
import { AddMat } from "../_components/materials/addMat";
import DisTable from "../_components/materials/disTable";
import SupplyTable from "../_components/materials/supTable";

export default async function MaterialsPage() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Поставщики</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Вы не авторизованы.</p>
      </div>
    );
  }

  const materials = await db.material.findMany();
  const dispatch = await db.dispatch.findMany({
    include: {
      user: true,
    },
  });
  const supply = await db.supply.findMany({
    include: {
      supplier: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Table Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Материалы</h1>
          <AddMat />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <MaterialsTable materials={materials} />
        </div>
      </div>

      {/* Secondary Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dispatch Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Последние выдачи</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <DisTable dispatch={dispatch}/>
          </div>
        </div>

        {/* Supply Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Последние поставки</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <SupplyTable supply={supply}/>
          </div>
        </div>
      </div>
    </div>
  );
}