/** @format */

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';
import { SuperHero } from '../Types/superHero';

const RQSuperHeroe: FC = () => {
  const { heroId } = useParams();
  const { isLoading, isError, error, data } = useSuperHeroData(
    heroId as string
  );
  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{(error as any).message}</h2>;
  }
  return (
    <div>
      <h1>{(data?.data as SuperHero).name}</h1>
      <h2>{(data?.data as SuperHero).alterEgo}</h2>
    </div>
  );
};

export default RQSuperHeroe;
