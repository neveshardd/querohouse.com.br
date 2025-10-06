'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';
import AuthModal from './AuthModal';
import { motion } from 'framer-motion';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container-elegant">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-slate-800 transition-smooth">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-slate-900">QueroHouse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/" 
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth"
              >
                Início
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/imoveis" 
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth"
              >
                Imóveis
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/anunciar" 
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth"
              >
                Anunciar
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/sobre" 
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth"
              >
                Sobre
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contato" 
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth"
              >
                Contato
              </Link>
            </motion.div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth">
                  <UserIcon className="h-4 w-4" />
                  <span>{user.name}</span>
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={`${
                              active ? 'bg-slate-50' : ''
                            } block px-4 py-2 text-sm text-slate-700`}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? 'bg-slate-50' : ''
                            } block px-4 py-2 text-sm text-slate-700`}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${
                              active ? 'bg-slate-50' : ''
                            } block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-700`}
                          >
                            Sair
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <motion.button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bars3Icon className="h-6 w-6" />
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-smooth">
                <Bars3Icon className="h-6 w-6" />
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/"
                          className={`${
                            active ? 'bg-slate-50' : ''
                          } block px-4 py-2 text-sm text-slate-700`}
                        >
                          Início
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/imoveis"
                          className={`${
                            active ? 'bg-slate-50' : ''
                          } block px-4 py-2 text-sm text-slate-700`}
                        >
                          Imóveis
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/anunciar"
                          className={`${
                            active ? 'bg-slate-50' : ''
                          } block px-4 py-2 text-sm text-slate-700`}
                        >
                          Anunciar
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/sobre"
                          className={`${
                            active ? 'bg-slate-50' : ''
                          } block px-4 py-2 text-sm text-slate-700`}
                        >
                          Sobre
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/contato"
                          className={`${
                            active ? 'bg-slate-50' : ''
                          } block px-4 py-2 text-sm text-slate-700`}
                        >
                          Contato
                        </Link>
                      )}
                    </Menu.Item>
                    {isAuthenticated && user ? (
                      <>
                        <div className="border-t border-slate-200 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard"
                              className={`${
                                active ? 'bg-slate-50' : ''
                              } block px-4 py-2 text-sm text-slate-700`}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${
                                active ? 'bg-slate-50' : ''
                              } block px-4 py-2 text-sm text-slate-700`}
                            >
                              Perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`${
                                active ? 'bg-slate-50' : ''
                              } block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-700`}
                            >
                              Sair
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <div className="border-t border-slate-200 my-1"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setIsAuthModalOpen(true)}
                              className={`${
                                active ? 'bg-slate-50' : ''
                              } block w-full text-left px-4 py-2 text-sm text-slate-700`}
                            >
                              Entrar / Cadastrar
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}
