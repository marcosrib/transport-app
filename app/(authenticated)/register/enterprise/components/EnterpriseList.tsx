import { TableCustom } from '@/app/(authenticated)/_components/table';
import { ParamsProps } from '../types';
import ButtonEdit from './ButtonEdit';
import UserSearch from './EnterpriseSearch';
import { getEnterprise } from '../actions/EnterpriseAction';
export default async function EnterpriseList({ searchParams }: ParamsProps) {
  const data = await getEnterprise();

  return (
    <>
      <UserSearch searchParams={searchParams} />
      <TableCustom.Root>
        <TableCustom.Body data={data} params={searchParams}>
          <TableCustom.Header>
            <TableCustom.HeaderContent title="Id" />
            <TableCustom.HeaderContent title="Nome" />
            <TableCustom.HeaderContent title="Email" />
            <TableCustom.HeaderContent title="Inscrição municipal" />
            <TableCustom.HeaderContent title="Inscrição estadual" />
            <TableCustom.HeaderContent title="Telefone" />
            <TableCustom.HeaderContent title="Ações" />
          </TableCustom.Header>
          <TableCustom.Column field="id">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="name">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="email">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="municipal_registration">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="state_registration">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="phone">
            {(field) => {
              return <p>{field}</p>;
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
