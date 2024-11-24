import React, { ReactNode } from 'react';
import Pagination from './Pagination';

type Props = {
  data: any;
  children: ReactNode;
  params?: any;
  isSize?: boolean;
};

export async function TableBody({
  children,
  data,
  params,
  isSize = true,
}: Props) {
  const initialParams = {
    page: 1,
    size: 10,
    ...params,
  };

  /*const paramsUrl = new URLSearchParams(initialParams).toString();
  const urlComplete = isSize ? `${url}?${paramsUrl}` : url;

  let data = null;*/
  let totalPages = 0;
  console.log('data', data);

  if (data === null) {
    return <>Não há dados</>;
  }

  if (isSize) {
    totalPages = 1;
    data = data;
  } else {
    data = data;
  }

  const header = React.Children.toArray(children)[0];

  return (
    <>
      <div
        className="
          flex 
          flex-col 
          my-6 
          mx-4 
          rounded-2xl 
          shadow-xl 
          shadow-gray-200
          dark:shadow-none
          dark:border-opacity-20 
          dark:border 
          dark:border-white"
      >
        <div className="overflow-x-auto rounded-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full table-fixed">
                {header}
                <tbody className="bg-white divide-y divide-gray-200/25 dark:bg-gray-800">
                  {data.map((row: any, rowIndex: number) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {React.Children.map(children, (child, columnIndex) => {
                        if (React.isValidElement(child)) {
                          if (columnIndex === 0) return;

                          if (child.props.field === 'actions') {
                            return child.props.children(JSON.stringify(row));
                          }
                          return (
                            <td
                              key={columnIndex}
                              className="p-4 text-gray-600 dark:text-gray-300 text-sm font-normal  whitespace-nowrap"
                            >
                              {child.props.field === 'combinedData'
                                ? child.props.children(JSON.stringify(row))
                                : child.props.children(row[child.props.field])}
                            </td>
                          );
                        }
                        return null;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isSize && (
        <div
          className="
          flex justify-center items-center 
          p-4 my-4 mx-4
          bg-white rounded-2xl 
          text-xs
          shadow-xl shadow-gray-200 
          sm:flex sm:justify-between
          dark:shadow-none
          dark:border-opacity-20 
          dark:border 
          dark:bg-gray-800
          dark:border-white"
        >
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
