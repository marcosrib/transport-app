import Header from './_components/layout/Header';
import Sidebar from './_components/layout/Sidebar';
import AppProviders from './providers';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <Sidebar />
          <div className="flex flex-col w-full md:space-y-4">
            <Header />
            <div className="h-screen pb-24 xl:overflow-auto overflow-auto pr-5">
              <AppProviders>{children}</AppProviders>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
