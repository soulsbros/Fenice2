import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import rootReducer from './reducers';
import rootSaga from './sagas';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();
let composedMiddleware = applyMiddleware(sagaMiddleware);
if (reduxDevTools) {
  composedMiddleware = compose(applyMiddleware(sagaMiddleware), reduxDevTools);
}

const store = createStore(rootReducer, composedMiddleware);
// Register all sagas;
rootSaga.map((saga) => sagaMiddleware.run(saga));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
