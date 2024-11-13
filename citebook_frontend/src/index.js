import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore,applyMiddleware,compose} from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";


const persistConfig={
    key: 'main-root',
    storage,
};
const persistedReducer=persistReducer(persistConfig,reducers);
const composeEnchancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer,composeEnchancers(applyMiddleware(reduxThunk)));
const persistor=persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.querySelector('#root')
);