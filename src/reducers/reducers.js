import initialState from './initialState';

export default function EmpReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_LISTS":
      const subLists = new Set([...state.subordinates, ...action.payload]);
      return {
        ...state,
        subordinates: [...subLists]
      };
    
    default:
      return state;
  }
}
