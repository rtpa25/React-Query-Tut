/** @format */

import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const useSuperHeroesData = (
  onSuccess: (data: AxiosResponse<any, any>) => void,
  onError: (error: any) => void
) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};
