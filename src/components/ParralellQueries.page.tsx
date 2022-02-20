/** @format */

import { FC } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { SuperHero } from '../Types/superHero';
import { friend } from '../Types/friend';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

//these API calls are concurent
const ParralellQueries: FC = () => {
  const { data: SuperHeroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: Friends } = useQuery('friends', fetchFriends);
  return (
    <div>
      <ul>
        {SuperHeroes?.data.map((item: SuperHero) => {
          return (
            <li key={item.id}>
              <h3>{item.name}</h3>
            </li>
          );
        })}
        {Friends?.data.map((item: friend) => {
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

export default ParralellQueries;
