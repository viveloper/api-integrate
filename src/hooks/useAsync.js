import { useReducer, useEffect, useCallback } from 'react';

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        data: null,
        error: null,
        isLoading: true,
      };
    case 'SUCCESS':
      return {
        data: action.data,
        error: null,
        isLoading: false,
      };
    case 'ERROR':
      return {
        data: null,
        error: action.error,
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const useAsync = (promiseFn, deps = []) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    data: null,
    error: null,
    isLoading: false,
  });

  const fetchData = useCallback(async () => {
    try {
      dispatch({
        type: 'LOADING',
      });
      const data = await promiseFn();
      dispatch({
        type: 'SUCCESS',
        data,
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        error,
      });
    }
  }, [promiseFn]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
};

export default useAsync;
