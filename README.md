# Проект на T3 Stack (Next.js, Prisma, NextAuth, TypeScript)

## 🚀 Описание проекта
Этот проект представляет собой систему домашней бухгалетерии. Здесь пользователь может следить за своими доходами и расходами.

## 🛠 Технологии
- **T3 Stack** (Next.js, TypeScript, Tailwind, tRPC, Prisma, NextAuth)
- **Next.js 14** – React-фреймворк
- **TypeScript** – строгая типизация
- **Prisma** – современный ORM
- **NextAuth.js** – аутентификация
- **Tailwind CSS** – стилизация

## 📦 Установка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Установить зависимости
pnpm install

# 3. Инициализация БД
pnpm prisma migrate dev --name init

# 4. Запуск контейнеров
pnpm db:start

# 5. Запуск разработки
pnpm run dev
