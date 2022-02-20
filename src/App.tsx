/** @format */

import { FC } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  HomePage,
  HWSuperHeroesPage,
  ParralellQueries,
  RQSuperHeroePage,
  RQSuperHeroesPage,
  SuperHeroesPage,
} from './components/zexporter';

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
            <li>
              <Link to='/hw-super-heroes'>HW Super Heroes</Link>
            </li>
            <li>
              <Link to='/parrallel-query'>Parallel Query Page</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/super-heroes' element={<SuperHeroesPage />} />
          <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
          <Route path='/hw-super-heroes' element={<HWSuperHeroesPage />} />
          <Route
            path='/rq-super-heroes/:heroId'
            element={<RQSuperHeroePage />}
          />
          <Route path='/parrallel-query' element={<ParralellQueries />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
    </>
  );
};

export default App;
