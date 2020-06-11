import React, { useState } from 'react';
import axios from 'axios';
import useAsync from '../hooks/useAsync';
import User from './User';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

function Users() {
  const [state, fetchData] = useAsync(getUsers, []);
  const [userId, setUserId] = useState(null);

  const { data: users, error, isLoading } = state;

  if (isLoading) return <h3>로딩중...</h3>;
  if (error) return <h3>에러 발생</h3>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
