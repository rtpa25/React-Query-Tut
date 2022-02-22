/** @format */

import axios, { AxiosResponse } from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SuperHero } from '../Types/superHero';

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

const addSuperHero = (hero: SuperHero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};

//optimistic update
export const useAddSuperHeroData = () => {
  const qc = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   qc.setQueryData('super-heroes', (oldData: any) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, data.data],
    //     };
    //   });
    //   // qc.invalidateQueries('super-heroes');
    // },
    onMutate: async (newHero: SuperHero) => {
      await qc.cancelQueries('super-heroes');
      const prevQueryData = qc.getQueryData('supper-heroes');
      qc.setQueryData('super-heroes', (oldData: any) => {
        return {
          ...oldData,
          data: [...oldData.data, newHero],
        };
      });
      return {
        prevQueryData,
      };
    },
    onError: (_error, _hero, context) => {
      qc.setQueryData('super-heroes', context?.prevQueryData);
    },
    onSettled: () => {
      qc.invalidateQueries('super-heroes');
    },
  });
};
