import { ChangeEvent, useRef, useState } from "react";

import styles from "./App.module.css";

enum Operations {
  Sum = "sum",
  Fib = "fib",
}

interface WasmRef {
  [Operations.Fib]: (a: number) => number;
  [Operations.Sum]: (a: number, b: number) => number;
  greet: (name: string) => void;
}

function App() {
  import("wasm").then(({ add_two_ints: sum, fib, greet }) => {
    wasmRef.current = { sum, fib, greet };
  });

  const wasmRef = useRef<WasmRef | null>(null);

  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState({
    firstNumber: 0,
    secondNumber: 0,
    fibNumber: 0,
  });
  const [resultOperations, setResultOperations] = useState({
    [Operations.Sum]: 0,
    [Operations.Fib]: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isNaN(+value)) return;

    setNumbers((state) => ({ ...state, [name]: value }));
  };

  const handleExecute = (operation: Operations) => () => {
    if (wasmRef.current) {
      const { firstNumber, secondNumber, fibNumber } = numbers;
      const result =
        operation === Operations.Sum
          ? wasmRef.current.sum(firstNumber, secondNumber)
          : wasmRef.current.fib(fibNumber);
      setResultOperations((state) => ({ ...state, [operation]: result }));
    }
  };

  const handleGreet = () => {
    if (wasmRef.current) {
      wasmRef.current.greet(name);
    }
  };

  return (
    <div className={styles.container}>
      <h1>WASM + React</h1>
      <section>
        <label htmlFor="name">
          <span>Name:</span>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Type your name..."
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleGreet}>
          Greet
        </button>
      </section>

      <section>
        <label htmlFor="firstNumber">
          <span>First Number:</span>
          <input
            type="text"
            id="firstNumber"
            name="firstNumber"
            value={numbers.firstNumber}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="secondNumber">
          <span>Second Number:</span>
          <input
            type="text"
            id="secondNumber"
            name="secondNumber"
            value={numbers.secondNumber}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleExecute(Operations.Sum)}>
          Sum Numbers
        </button>
        <p>Sum Results: {resultOperations[Operations.Sum]}</p>
      </section>

      <section>
        <label htmlFor="fibNumber">
          <span>Fibonacci Number:</span>
          <input
            type="text"
            id="fibNumber"
            name="fibNumber"
            value={numbers.fibNumber}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleExecute(Operations.Fib)}>
          Number Fibonacci
        </button>
        <p>Fibonacci Results: {resultOperations[Operations.Fib]}</p>
      </section>
    </div>
  );
}

export default App;
