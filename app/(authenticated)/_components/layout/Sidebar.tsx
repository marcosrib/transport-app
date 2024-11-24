'use client';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { Nav } from '../nav';

export default function Sidbar() {
  const path = usePathname();

  return (
    <div className="relative hidden h-screen lg:block w-80">
      <div className="h-full bg-gray-100 px-5 dark:bg-gray-800">
        <div className="flex items-center justify-start pt-6 ml-8">
          <p className="text-xl font-bold dark:text-white">ERP</p>
        </div>

        <Nav.Root>
          <Nav.LinkMenu route="/dashboard" active={path === '/dashboard'}>
            <Nav.Icon icon={<BiSolidDashboard size={20} />} />
            <Nav.IconLabel label="Dashboard" />
          </Nav.LinkMenu>
          <Nav.AccordionMenu
            label="Cadastro"
            active={path.includes('/register')}
            icon={<MdLibraryBooks size={20} />}
          >
            <Nav.Link route="/register/user" active={path === '/register/user'}>
              <Nav.IconLabel label="Usuario" />
            </Nav.Link>
            <Nav.Link
              route="/register/permission"
              active={path.includes('/register/permission')}
            >
              <Nav.IconLabel label="Permisões" />
            </Nav.Link>
          </Nav.AccordionMenu>
          <Nav.AccordionMenu
            label="Financeiro"
            active={path.includes('/financial')}
            icon={<FaDollarSign size={20} />}
          >
            <Nav.Link
              route="/financial/cost-center"
              active={path === '/financial/cost-center'}
            >
              <Nav.IconLabel label="Centro de custo" />
            </Nav.Link>
            <Nav.Link
              route="/financial/chart-account"
              active={path.includes('/financial/chart-account')}
            >
              <Nav.IconLabel label="Plano de contas" />
            </Nav.Link>
            <Nav.Link
              route="/financial/releases"
              active={path.includes('/financial/releases')}
            >
              <Nav.IconLabel label="Lancamentos" />
            </Nav.Link>
          </Nav.AccordionMenu>
        </Nav.Root>
      </div>
    </div>
  );
}
