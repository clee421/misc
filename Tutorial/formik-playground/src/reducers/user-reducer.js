const initialState = {};
const ref = { id: 0  };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_USER':
      ref.id++;
      return { ...state, [ref.id]: action.user };

    default:
      return state;
  }
};

export default userReducer;