/** @format */

import axios from 'axios';
import { FC, Fragment, MouseEventHandler } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Color } from '../Types/Color';

const fetchColors = (pageParam: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQuery: FC = () => {
  const {
    data: Colors,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['colors'],
    ({ pageParam = 1 }) => fetchColors(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }
  return (
    <div>
      <ul>
        {Colors?.pages!.map((group, index) => {
          return (
            <Fragment key={index}>
              {(group.data as Color[]).map((color) => {
                return (
                  <li key={color.id}>
                    <h2>{color.label}</h2>
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>
      <div>
        <button
          disabled={!hasNextPage}
          onClick={fetchNextPage as MouseEventHandler<HTMLButtonElement>}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
};

export default InfiniteQuery;
