/** @format */

import { AxiosResponse } from 'axios';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';
import { SuperHero } from '../Types/superHero';

//==CACHING==//
//cache time is default to 5min updating the cache time to 5sec makes the isLoading true every 5sec if you revisit the UI
//default stale time is 0sec, so whenever the page is visited a background req is made to keep the cache updated but if you know that your data is not updated in the server so often and it's fine for the user to see the old data let's say for 30s then there wont be any network req in the background for 30sec even you visit the page
//default for refetchOnMount is true it is the one that we need and same as refetchOnWindoFocus is also set to true
//==POLLING===//
//making refetchInterval to 2sec will make network request every 2sec, this can be used in applications where the server data changes very frequently
//refetchIntervalInBackground set to true will make network requests also when the screen looses focus
//enabled false just does not make a network reques to fetch the data
//refetch function can be used to fetch the data when the user wants basically like fetching data on a press of a button
//OnSuccess and Onerror are basically post performance fucntions you can create sideeffects after a certain operation is done
//the select func changes the data into a format that we need but the types are still fucked
const RQSuperHeroes: FC = () => {
  //the type of data you set here is the type of data that gets extracted from useQuery
  const onSuccess = (data: AxiosResponse<any, any>) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }

  console.log(isLoading, isFetching);

  return (
    <div>
      <h2>SuperHeroes</h2>
      <ul>
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
