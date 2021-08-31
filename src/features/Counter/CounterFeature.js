import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter); //get state form redux

  const handleIncrement = () => {
    const action = increase(); //action creator from counterSlice
    dispatch(action);
  };

  const handleDecrement = () => {
    const action = decrease();
    dispatch(action);
  };

  return (
    <div>
      CounterFeature {counter}
      <Button onClick={handleIncrement}>Increment</Button>
      <Button onClick={handleDecrement}>Decrement</Button>
    </div>
  );
}

export default CounterFeature;
