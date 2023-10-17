import React from "react";

type Listener<S> = (newState: S) => void;
export interface ISubscription<S extends any> {
  subscribe: (fn: Listener<S>) => void;
  unsubscribe: (fn: Listener<S>) => void;
  listener: Set<Listener<S>>;
  state: S;
  updateState: (
    nextState: S | any,
    forceUpdate?: boolean,
    mergeNestedObjectProps?: boolean
  ) => void;
  [key: string]: any;
}
export interface IReactive<S extends any> {
  subscribe: (fn: Listener<string>) => void;
  unsubscribe: (fn: Listener<string>) => void;
  listener: Set<Listener<string>>;
  store: S;
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export function mergeDeep(target, source) {
  const t = { ...(target || {}) };
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      Object.assign(source[key], mergeDeep(t[key], source[key]));
    }
  }

  // Join `target` and modified `source`
  Object.assign(t || {}, source);
  return t;
}

export function createSubscription<S extends object>(
  initialState?: S
): ISubscription<S> {
  let state: S = initialState || ({} as any);
  const listener: Set<Listener<S>> = new Set();
  const subscribe = (fn: Listener<S>) => {
    listener.add(fn);
  };
  const unsubscribe = (fn: Listener<S>) => listener.delete(fn);
  const updateState = (
    nextState: S,
    forceUpdate = true,
    mergeNestedObjectProps = false
  ) => {
    if (mergeNestedObjectProps) {
      state = mergeDeep(state, nextState);
    } else {
      state = { ...state, ...nextState };
    }
    if (forceUpdate) {
      listener.forEach((fn) => fn(nextState));
    }
  };
  return {
    subscribe,
    unsubscribe,
    listener,
    get state() {
      return state;
    },
    set state(nextState) {
      state = nextState;
    },
    updateState,
  };
}

export interface IStateUpdater<S> {
  changed?: any;
  setState: (newState: any, callback?: (newState: S) => void) => void;
  state: S;
}

function useSubscriber<S extends object, P extends Array<string>>(
  subscriber: ISubscription<S>,
  /**
   * To pick nested object property to depend on, use the syntax 'level1.level2.level3.test'.
   *
   * @see  getPropValue
   */
  pick?: P
) {
  if (!subscriber) {
    console.trace("Missing subscriber!!");
  }
  const [changed, setUpdate] = React.useState({});
  const updater = React.useCallback(
    (nextState: S) => {
      if (
        subscriber &&
        (!pick?.length ||
          pick.filter((prop) => getPropValue(nextState, prop) !== undefined)
            .length > 0)
      ) {
        setUpdate({});
      }
    },
    [pick]
  );
  React.useEffect(() => {
    if (subscriber) {
      subscriber.subscribe(updater);
      return () => subscriber.unsubscribe(updater);
    }
    return;
  }, []);
  return changed;
}

export function useSubscription<S extends object, P extends Array<string>>(
  subscriber: ISubscription<S>,
  pick?: P
): IStateUpdater<S> {
  const changed = useSubscriber(subscriber, pick);
  React.useDebugValue(subscriber?.state);

  return {
    changed,
    state: subscriber?.state,
    setState: React.useCallback(
      (newState: any, callback?: Function) => {
        if (!subscriber) {
          return;
        }
        if (typeof newState === "object" && newState.constructor === Object) {
          subscriber.state = Object.assign({}, subscriber.state, newState);
        } else if (typeof newState === "function") {
          const nextState = newState(subscriber.state);
          subscriber.state = Object.assign({}, subscriber.state, nextState);
        } else {
          subscriber.state = newState;
        }
        subscriber.listener.forEach((fn) => fn(newState));
        callback && callback();
      },
      [subscriber.state, pick]
    ),
  };
}

/**
 * This function can be used to get value of a nested object property.
 *
 * For example, if we have an object looks like below:
 *
 * const obj = { level1: { level2: { level3: { test: 'success' } } } }
 *
 * Then, we can use this function to get value of a nested object property:
 *
 * console.log(getPropValue(obj, 'level1.level2.level3'))
 * // ---> { test: 'success' }
 *
 * console.log(getPropValue(obj, 'level1.level2.level3.test'))
 * // ---> 'success'
 *
 * @param   obj
 * @param   propPath
 *
 * @return  any
 */
export function getPropValue(obj, propPath) {
  const keys = propPath.split(".").map((key) => key.trim());
  let value = obj;

  for (let i = 0; i < keys.length; i++) {
    if (value[keys[i]] === undefined) {
      return undefined;
    }

    value = value[keys[i]];
  }

  return value;
}