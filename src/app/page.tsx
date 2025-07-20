import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">🚀 О приложении! 🚀</h1>
        <p className="text-lg text-center mb-10 text-gray-600">
          Обязательно прочтите перед началом работы — это сделает использование сервиса проще и удобнее!
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Карточка профиля */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">👤</span> Страница профиля
            </h2>
            <p className="text-gray-700">
              Ваша визитная карточка в системе! Здесь можно обновить личные данные.
            </p>
          </div>

          {/* Карточка сотрудников */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">👥</span> Страница сотрудников
            </h2>
            <p className="text-gray-700">
              Полный список команды! Все, кто работает в вашем учреждении и имеет доступ к материалам со склада. При оформлении новой выдачи выберите подходящего сотрудника из списка.
            </p>
          </div>

          {/* Карточка поставщиков */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">🤝</span> Страница поставщиков
            </h2>
            <p className="text-gray-700">
              База всех партнеров и их контактов. При оформлении новой поставки выберите подходящего поставщика из списка.
            </p>
          </div>

          {/* Карточка материалов */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">📦</span> Страница материалов
            </h2>
            <p className="text-gray-700">
              Здесь — вся информация о товарах на складе. Самостоятельно добавляйте новые материалы, а также меняйте количество материалов в зависимости от поставок и выдач.
            </p>
          </div>

          {/* Карточка поставок */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">📥</span> Страница поставок
            </h2>
            <p className="text-gray-700">
              Фиксируйте каждое поступление материалов! Указывайте поставщика, количество и дату.
            </p>
          </div>

          {/* Карточка выдачи */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">📤</span> Страница выдачи
            </h2>
            <p className="text-gray-700">
              Учет списания материалов стал проще! Регистрируйте, кому и сколько было выдано.
            </p>
          </div>
        </div>

        <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-center">
            💡 Система обновляет все данные — вам остается только вносить изменения!
          </p>
        </div>
      </main>
    </HydrateClient>
  );
}