import { SIGN_IN, SIGN_OUT } from './user.types';

const INITIAL_STATE = {
  me: {
    _id: null,
    displayName: null,
    email: null,
    role: null,
    username: null,
  },
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        me: { ...INITIAL_STATE.me, ...action.payload.me },
      };
    case SIGN_OUT:
      return {
        ...state,
        me: INITIAL_STATE.me,
      };
    default:
      return state;
  }
};
