/** @format */

import { AxiosResponse } from 'axios';
import { FC, MouseEventHandler } from 'react';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';
import { SuperHero } from '../Types/superHero';

const HWSuperHeroes: FC = () => {
  const onSuccess = (data: AxiosResponse<any, any>) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  return (
    <div>
      <h2>SuperHeroes</h2>
      <button onClick={refetch as MouseEventHandler<HTMLButtonElement>}>
        LOAD
      </button>
      <ul>
        {data?.data.map((hero: SuperHero) => {
          return (
            <li key={hero.id}>
              <h3>{hero.name}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HWSuperHeroes;
