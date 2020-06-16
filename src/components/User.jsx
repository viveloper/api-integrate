import React, { useEffect } from 'react';
import {
  getUser,
  useUsersState,
  useUsersDispatch,
} from '../context/UsersContext';

function User({ id }) {
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  const { loading, data: user, error } = state.user;

  useEffect(() => {
    getUser(dispatch, id);
  }, [id, dispatch]);

  if (loading) return <h3>로딩중...</h3>;
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
