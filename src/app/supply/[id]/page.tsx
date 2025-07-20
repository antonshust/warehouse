import { db } from "~/server/db";
import { updateSupply, deleteSupply } from "~/app/api/action/supply";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supply = await db.supply.findUnique({ where: { id: params.id } });
  const suppliers = await db.supplier.findUnique({ where: { id: supply?.supplierId ?? "" } });
  const date = new Date(supply?.date ?? "").toISOString().split("T")[0];

  if (!supply) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Поставка не найдена
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            К сожалению, запрашиваемой поставки не существует.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Редактировать данные поставки
        </h2>

        <form
          action={async (formData) => {
            "use server";
            await updateSupply(formData);
            redirect("/supply");
          }}
        >
          <div className="space-y-4">
            <input type="hidden" name="id" defaultValue={supply.id ?? ""} />
            <div>
              <label
                htmlFor="supplierId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Поставщик
              </label>
              <select
                id="supplierId"
                name="supplierId"
                required
                className="mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                defaultValue={supply.supplierId ?? ""}
              >
                <option value="">Выберите поставщика</option>
                <option value={suppliers?.id}>{suppliers?.name}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Материал
              </label>
              <input
                type="text"
                id="material"
                name="material"
                required
                className="mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                defaultValue={supply.material ?? ""}
                placeholder="Карандаш"
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Количество
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                required
                className="mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                defaultValue={supply.quantity ?? ""}
                placeholder="100"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Дата
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                defaultValue={date}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Обновить
              </button>
              <button
                type="button"
                onClick={async () => {
                  "use server";
                  await deleteSupply({ id: supply.id });
                  redirect("/supply");
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}