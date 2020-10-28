import initialState from './initialState';

export default function EmpReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_LISTS":
      return {
        ...state,
        subordinates: [...state.subordinates, ...action.payload]
      };
    
    default:
      return state;
  }
}
