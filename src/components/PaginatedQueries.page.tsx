/** @format */

import axios from 'axios';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Color } from '../Types/Color';

const fetchColors = (pageNumber: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueries: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {
    data: Colors,
    isLoading,
    error,
    isError,
    isFetching,
  } = useQuery(['colors', pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true,
  });

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  return (
    <div>
      <ul>
        {(Colors?.data as Color[]).map((color) => {
          return (
            <li key={color.id}>
              <h3>{color.label}</h3>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}>
          PREV
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}>
          NEXT
        </button>
      </div>
      {isFetching && <div>Loading...</div>}
    </div>
  );
};

export default PaginatedQueries;
