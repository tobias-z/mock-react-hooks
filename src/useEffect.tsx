type Effect = () => void;
type EffectWithReturn = () => () => void;
type DepArray = Array<unknown>;

type UseEffect = {
  effect: Effect | EffectWithReturn;
  dependencyArray: DepArray;
  called: boolean;
};

let useEffects: Array<UseEffect> = [];
let useEffectCalls = -1;
export let returnCallbacks: Array<() => void> = [];

export function resetUseEffect() {
  useEffectCalls = -1;
}

function isNewDependency(callId: number, dependencyArray: DepArray): boolean {
  let hasChanged = false;
  useEffects[callId].dependencyArray.forEach((dep, index) => {
    if (dep !== dependencyArray[index]) {
      useEffects[callId].dependencyArray[index] = dependencyArray[index];
      hasChanged = true;
    }
  });
  return hasChanged;
}

export function useEffect(
  callback: Effect | EffectWithReturn,
  dependencyArray: DepArray
) {
  let callId = ++useEffectCalls;

  if (!useEffects[callId]) {
    useEffects[useEffectCalls] = {
      effect: callback,
      dependencyArray: dependencyArray,
      called: false,
    };
  }

  let hasBeenCalled = useEffects[callId].called;
  let dependenciesHasChanged = isNewDependency(callId, dependencyArray);

  if (!hasBeenCalled || dependenciesHasChanged) {
    let returnCallback = callback();
    if (returnCallback && !hasBeenCalled) {
      returnCallbacks.push(returnCallback);
    }
  }

  useEffects[callId].called = true;
}
