import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import { commonReducer } from './common/common.reducer';
import { userReducer } from './user/user.reducer';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['me'],
};

export const rootReducer = combineReducers({
  common: commonReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
