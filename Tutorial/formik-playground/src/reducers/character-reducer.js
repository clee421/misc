const initialState = {};

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_CHARACTERS':
      return { ...state, ...action.characters };

    default:
      return state;
  }
};

export default characterReducer;