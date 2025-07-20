import React from "react";
import Link from "next/link";
import { SignOutButton } from "./signlink";
import { type Session } from "next-auth";
import { 
  UserCircleIcon, 
  ChevronDownIcon,
  PowerIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/solid";

export async function Navbar({ session }: { session: Session | null }) {
  const isLoggedIn = !!session?.user;
  const userEmail = session?.user?.email;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-300 flex items-center"
        >
          <span className="mr-2">📦</span>
          <span className="hidden sm:inline">Управление складом</span>
          <span className="sm:hidden">Склад</span>
        </Link>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {/* Основные ссылки для десктопа */}
              <div className="hidden md:flex space-x-4">
                <NavLink href="/profile" emoji="👤" text="Профиль" />
                <NavLink href="/employees" emoji="👥" text="Сотрудники" />
                <NavLink href="/suppliers" emoji="🤝" text="Поставщики" />
                <NavLink href="/materials" emoji="📦" text="Материалы" />
              </div>

              {/* Выпадающее меню */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <UserCircleIcon className="h-8 w-8 text-white" />
                  <span className="text-white font-medium hidden sm:inline">
                    {userEmail?.split('@')[0] || 'Аккаунт'}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-white hidden sm:inline" />
                </div>
                
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-64 mt-3 z-50 border border-gray-100"
                >
                  <li className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <UserCircleIcon className="h-10 w-10 text-blue-600" />
                      <div className="ml-3">
                        <p className="font-semibold">{userEmail?.split('@')[0]}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      </div>
                    </div>
                  </li>
                  
                  <li>
                    <Link href="/profile" className="flex items-center py-3 px-4 hover:bg-blue-50">
                      <span className="mr-2">👤</span>
                      <span>Профиль</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/employees" className="flex items-center py-3 px-4 hover:bg-blue-50">
                      <span className="mr-2">👥</span>
                      <span>Сотрудники</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/suppliers" className="flex items-center py-3 px-4 hover:bg-blue-50">
                      <span className="mr-2">🤝</span>
                      <span>Поставщики</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/materials" className="flex items-center py-3 px-4 hover:bg-blue-50">
                      <span className="mr-2">📦</span>
                      <span>Материалы</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/supply" className="flex items-center py-3 px-4 hover:bg-blue-50">
                      <span className="mr-2">📥</span>
                      <span>Поставки</span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="/distributions" className="flex items-center py-3 px-4 hover:bg-blue-50">
                      <span className="mr-2">📤</span>
                      <span>Выдачи</span>
                    </Link>
                  </li>
                  
                  
                <li>
                  <SignOutButton />
                </li>
                </ul>
              </div>
            </>
          ) : (
            <Link 
              href="/api/auth/signin" 
              className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-sm flex items-center"
            >
              Войти
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Компонент для навигационных ссылок
function NavLink({ href, emoji, text }: { href: string; emoji: string; text: string }) {
  return (
    <Link
      href={href}
      className="flex items-center text-white hover:text-blue-100 transition-colors duration-200 font-medium px-3 py-1 rounded-lg"
    >
      <span className="mr-2 text-lg">{emoji}</span>
      <span>{text}</span>
    </Link>
  );
}

