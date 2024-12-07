import { TableCustom } from '@/app/(authenticated)/_components/table';
import { ParamsProps } from '../types';
import ButtonEdit from './ButtonEdit';
import EnterpriseSearch from './EmplopyeesSearch';
import { getEmployees } from '../actions/EmployeesAction';
export default async function EmployeesList({ searchParams }: ParamsProps) {
  const data = await getEmployees({ searchParams });

  return (
    <>
      <EnterpriseSearch searchParams={searchParams} />
      <TableCustom.Root>
        <TableCustom.Body data={data} params={searchParams}>
          <TableCustom.Header>
            <TableCustom.HeaderContent title="Nome" />
            <TableCustom.HeaderContent title="cpf" />
            <TableCustom.HeaderContent title="Email" />
            <TableCustom.HeaderContent title="rg" />
            <TableCustom.HeaderContent title="Contato" />
            <TableCustom.HeaderContent title="Empresa" />
            <TableCustom.HeaderContent title="Ações" />
          </TableCustom.Header>
          <TableCustom.Column field="name">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="cpf">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="email">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="rg">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="phone">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="combinedData">
            {(field) => {
              return <p>{JSON.parse(field).enterprise.label}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="actions">
            {(row) => {
              let enterprise = JSON.parse(row);
              return (
                <TableCustom.Actions>
                  <ButtonEdit enterprise={enterprise} />
                </TableCustom.Actions>
              );
            }}
          </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    </>
  );
}
