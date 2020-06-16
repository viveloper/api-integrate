import React, { useState } from 'react';
import User from './User';
import {
  getUsers,
  useUsersDispatch,
  useUsersState,
  getUser,
} from '../context/UsersContext';

function Users() {
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  getUsers(dispatch);

  const { loading, data: users, error } = state.users;

  if (loading) return <h3>로딩중...</h3>;
  if (error) return <h3>에러 발생</h3>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => getUser(user.id)}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={() => getUsers(dispatch)}>다시 불러오기</button>
      {state.user.data && <User id={state.user.data.id} />}
    </>
  );
}

export default Users;
