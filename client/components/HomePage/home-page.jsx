import React from "react";

export const HomePage = () => {
  const [counter, setCounter] = React.useState(0);
  const [demand, setDemand] = React.useState(1);

  const onIncrement = (demand) => {
    setCounter(counter + demand);
  };

  const onDecrement = (demand) => {
    setCounter(counter - demand);
  };

  console.log(counter);
  console.log(demand);

  return (
    <div className="container">
      <h1>Counter App </h1>
      <h3> {counter} </h3>
      <div className="form">
        <div className="input">
          <input
            value={demand}
            onChange={(e) => setDemand(Number(e.target.value))}
          />
        </div>
        <div className="button-group">
          <button onClick={() => onIncrement(demand)}>Increment</button>
          <button onClick={() => [setCounter(0), setDemand(1)]}>Reset</button>
          <button onClick={() => onDecrement(demand)}>Decrement</button>
        </div>
      </div>
    </div>
  );
};
