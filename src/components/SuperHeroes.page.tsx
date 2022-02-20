/** @format */

import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { SuperHero } from '../Types/superHero';

const SuperHeroes: FC = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [data, setData] = useState<SuperHero[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/superheroes');
        setData(res.data);
      } catch (error: any) {
        console.log(error);
        setErrorMessage(error.message as string);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!isLoading && errorMessage !== '') {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <h3>{item.name}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SuperHeroes;
