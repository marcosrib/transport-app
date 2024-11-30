import { TableCustom } from '@/app/(authenticated)/_components/table';
import { ParamsProps } from '../types';
import ButtonEdit from './ButtonEdit';
import UserSearch from './MotoristSearch';
import { getMotorist } from '../actions/MotoristAction';
export default async function MotoristList({ searchParams }: ParamsProps = {}) {
  const data = await getMotorist({ searchParams });

  return (
    <>
      <UserSearch searchParams={searchParams} />
      <TableCustom.Root>
        <TableCustom.Body data={data} params={searchParams}>
          <TableCustom.Header>
            <TableCustom.HeaderContent title="Id" />
            <TableCustom.HeaderContent title="Nome" />
            <TableCustom.HeaderContent title="RG" />
            <TableCustom.HeaderContent title="CNH" />
            <TableCustom.HeaderContent title="CPF" />
            <TableCustom.HeaderContent title="Placa" />
            <TableCustom.HeaderContent title="Carro" />
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
          <TableCustom.Column field="rg">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="cnh">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="cpf">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="plate">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="car_name">
            {(field) => {
              return <p>{field}</p>;
            }}
          </TableCustom.Column>
          <TableCustom.Column field="actions">
            {(row) => {
              let motorists = JSON.parse(row);
              return (
                <TableCustom.Actions>
                  <ButtonEdit motorists={motorists} />
                </TableCustom.Actions>
              );
            }}
          </TableCustom.Column>
        </TableCustom.Body>
      </TableCustom.Root>
    </>
  );
}
