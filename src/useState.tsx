import { reRender } from ".";

type State<T> = [state: T, setState: (newState: T) => void];

let states: Array<State<any>> = [];
let calls = -1;

export function resetUseState() {
  calls = -1;
}

export function useState<T>(initialState: T): State<T> {
  let callId = ++calls;

  if (states[callId]) {
    return states[callId];
  }

  function setState(newState: T) {
    states[callId][0] = newState;
    reRender();
  }

  let state: State<T> = [initialState, setState];
  states[callId] = state;
  return state;
}
