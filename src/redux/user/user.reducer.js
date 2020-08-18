import { SIGN_IN, SIGN_OUT, UPDATE_PROFILE } from './user.types';

const INITIAL_STATE = {
  me: {
    _id: null,
    displayName: null,
    email: null,
    gender: null,
    phone: null,
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
    case UPDATE_PROFILE:
      return {
        ...state,
        me: { ...INITIAL_STATE.me, ...action.payload.me },
      };
    default:
      return state;
  }
};
