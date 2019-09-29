import createUniStore from "unistore";

export default function createStore(initStore = {}) {
  let store = createUniStore(initStore);
  const registerActions = newActions => {
    let actions = [];
    if (typeof newActions === "function") newActions = newActions(store);
    for (let i in newActions) {
      actions[i] = store.action(newActions[i]);
    }
    return actions;
  };

  return {
    ...store,
    registerActions
  };
}
