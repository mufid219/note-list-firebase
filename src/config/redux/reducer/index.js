const initialState = {
  isLogin: false,
  isLoading: false,
  popUp: false,
  user: {},
  notes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_POPUP":
      return {
        ...state,
        popUp: action.value,
      };
    case "CHANGE_ISLOGIN":
      return {
        ...state,
        isLogin: action.value,
      };
    case "CHANGE_USER":
      return {
        ...state,
        user: action.value,
      };
    case "CHANGE_LOADING":
      return {
        ...state,
        isLoading: action.value,
      };
    case "CHANGE_NOTES":
      return {
        ...state,
        notes: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
