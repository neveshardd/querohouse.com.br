'use client';

import { useAuth } from '@/hooks/useAuth';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Profile dropdown */}
          <div className="relative">
            <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                  {user.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {user.role}
                </span>
              </span>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span className="hidden sm:block">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}
