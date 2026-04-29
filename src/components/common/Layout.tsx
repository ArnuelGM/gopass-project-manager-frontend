import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <nav className="bg-white border-b border-gray-200 sticky top-0 w-full z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/projects" className="shrink-0 flex items-center gap-2 text-indigo-600 font-bold text-xl">
                <LayoutDashboard size={24} />
                <span>GoPass Projects</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Full Stack Challenge</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto py-6 sm:px-6 lg:px-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;