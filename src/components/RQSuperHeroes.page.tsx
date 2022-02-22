/** @format */

import { AxiosResponse } from 'axios';
import { FC, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from '../hooks/useSuperHeroesData';
import { SuperHero } from '../Types/superHero';

const RQSuperHeroes: FC = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  //the type of data you set here is the type of data that gets extracted from useQuery
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

  const {
    mutate: addHero,
    isLoading: addIsLoading,
    isError: addIsError,
  } = useAddSuperHeroData();

  if (isLoading || addIsLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError || addIsError) {
    return <h2>{(error as any).message}</h2>;
  }

  const handleHeroClick = () => {
    console.log({ name, alterEgo });
    const hero: SuperHero = {
      name: name,
      alterEgo: alterEgo,
      id: Math.random() * 100 + 6,
    };
    addHero(hero);
  };

  return (
    <div>
      <h2>SuperHeroes</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => {
            setAlterEgo(e.target.value);
          }}
        />
        <button onClick={handleHeroClick}>Add Hero</button>
      </div>
      <ul>
        <button onClick={refetch as MouseEventHandler<HTMLButtonElement>}>
          Fetch Heroes
        </button>
        {data?.data.map((hero: SuperHero) => {
          return (
            <li key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}>
                <h3>{hero.name}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RQSuperHeroes;
