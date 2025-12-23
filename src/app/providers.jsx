"use client";

import Navbar from "../_components/_common/Navbar";
import Header from "../_components/_common/Header";
import { AppProvider } from "../_context/AppContext";

export default function Providers({ children }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="group w-16 hover:w-48 transition-all duration-300 bg-black text-white shadow-md">
            <Navbar />
          </aside>

          {/* Main Content */}
          <main className="flex flex-1 flex-col bg-white p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
