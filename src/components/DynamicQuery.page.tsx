/** @format */

import axios from 'axios';
import { FC } from 'react';
import { useQueries } from 'react-query';

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicQuery: FC<{ heroIds: number[] }> = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log(queryResults);

  return <div>DynamicQuery</div>;
};

export default DynamicQuery;
