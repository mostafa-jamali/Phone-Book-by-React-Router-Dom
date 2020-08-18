import { applyMiddleware, createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';

import RootReducer from './RootReducer';

const middlewares = [logger];
// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ["contacts"]
//   }

//   const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    RootReducer,
    applyMiddleware(...middlewares)
)