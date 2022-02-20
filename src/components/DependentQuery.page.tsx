/** @format */

import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { User } from '../Types/user';

const fetchUserByEmail = (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId: string) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQuery: FC<{ email: string }> = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );
  const channelId = (user?.data as User).channelId;

  const { data: coursesData } = useQuery(['courses', channelId], () =>
    fetchCoursesByChannelId(channelId)
  );

  const courses: string[] = coursesData?.data.courses;
  return (
    <ul>
      {courses.map((course) => {
        return (
          <li key={course}>
            <h3>{course}</h3>
          </li>
        );
      })}
    </ul>
  );
};

export default DependentQuery;
