import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';

import { commonReducer } from './common/common.reducer';
import { userReducer } from './user/user.reducer';

const composeEnhancer =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  composeWithDevTools;

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['me'],
};

export const rootReducer = combineReducers({
  common: commonReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware())
);

// export const store = createStore(rootReducer);
export const persistor = persistStore(store);
