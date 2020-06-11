import React from 'react';
import axios from 'axios';
import useAsync from '../hooks/useAsync';

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { data: user, error, isLoading } = state;

  if (isLoading) return <h3>로딩중...</h3>;
  if (error) return <h3>에러 발생</h3>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
