import context from "./context";
import { useReducer } from "react";
import reducer, {initialState} from "../state/reducer";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={[ state, dispatch ]}>
      {children}
    </context.Provider>
  );
}
export default Provider;