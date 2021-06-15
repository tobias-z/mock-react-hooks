import ReactDOM from "react-dom";
import { resetUseEffect, returnCallbacks, useEffect } from "./useEffect";
import { resetUseState, useState } from "./useState";

export default function App() {
  let [count, setCount] = useState(5);
  let [name, setName] = useState("Bob");

  let increment = () => setCount(count + 1);

  useEffect(() => {
    console.log(count);
  }, [count]);

  useEffect(() => {
    console.log(name);
    return () => console.log("Cleanup function ran");
  }, [name]);

  return (
    <div>
      <h1>Hello Mocked Hooks 2</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}>
        <h2>{count}</h2>
        <input value={name} onChange={e => setName(e.target.value)} />
        <div>
          <button onClick={increment}>Increment</button>
        </div>
      </div>
    </div>
  );
}

export function reRender() {
  resetUseEffect();
  resetUseState();
  if (returnCallbacks) {
    returnCallbacks.forEach(callback => callback());
  }
  ReactDOM.render(<App />, document.getElementById("root"));
}
reRender();
