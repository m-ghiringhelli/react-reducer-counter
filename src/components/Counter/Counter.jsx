import { useEffect, useReducer } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': 
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'POSITIVE':
      return { ...state, color: colors.green };
    case 'ZERO':
      return { count: 0, color: colors.yellow };
    case 'NEGATIVE': 
      return { ...state, color: colors.red };
  }
}

export default function Counter() {
  const initialState = {count: 0, color: colors.yellow};
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.count === 0) {
      dispatch({ type: 'ZERO' });
    }

    if (state.count > 0) {
      dispatch({ type: 'POSITIVE' });
    }

    if (state.count < 0) {
      dispatch({ type: 'NEGATIVE' });
    }
  }, [state.count]);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  const reset = () => {
    dispatch({ type: 'ZERO' });
  };

  return (
    <main className={styles.main}>
      <h1 style={{ color: state.color }}>{state.count}</h1>
      <div>
        <button
          type="button"
          onClick={increment}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={decrement}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={reset}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
