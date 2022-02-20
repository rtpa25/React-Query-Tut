/** @format */

import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroe = ({ queryKey }: { queryKey: string[] }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId: string) => {
  return useQuery(['super-hero', heroId], fetchSuperHeroe);
};
