import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <div className="flex items-center ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">Flow</span>
                <span className="text-2xl font-bold text-gray-800">Pay</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-6">
              <Link 
                href="/"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200 relative group"
              >
                <span className="relative z-10">Atendimentos</span>
                <div className="absolute inset-0 bg-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
              <Link 
                href="/atendentes"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200 relative group"
              >
                <span className="relative z-10">Atendentes</span>
                <div className="absolute inset-0 bg-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all hover:shadow-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sistema de Atendimento</h1>
            <p className="text-gray-600">Gerencie seus atendimentos de forma eficiente</p>
          </div>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              © 2024 FlowPay. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                href="#"
                className="text-sm text-gray-500 hover:text-purple-700 transition-colors"
              >
                Termos de Uso
              </Link>
              <Link 
                href="#"
                className="text-sm text-gray-500 hover:text-purple-700 transition-colors"
              >
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 