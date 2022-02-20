/** @format */

import axios, { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { SuperHero } from '../Types/superHero';

const fetchSuperHeroe = ({ queryKey }: { queryKey: string[] }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

//because we already have all the data when we fetch the list of heroes so while fetching individual heroes can be set by the initial data and then fetch in background
export const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHeroe, {
    initialData: (): AxiosResponse<any, any> | undefined => {
      const hero = (
        (queryClient.getQueryData('super-heroes') as AxiosResponse<any, any>)
          .data as SuperHero[]
      ).find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          ...(queryClient.getQueryData('super-heroes') as AxiosResponse<
            any,
            any
          >),
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
