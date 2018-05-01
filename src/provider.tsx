import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import promiseMiddleware from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';
import * as $ from "jquery";

import rootReducer from "./reducers/index";
import IndexContainer from "./containers/indexContainer";

const createStoreWithMiddleWare = applyMiddleware(ReduxThunk, promiseMiddleware())(createStore);

$("body").html("<div id='container'></div>");
const container = $("#container");
ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(rootReducer)}>
        <IndexContainer />
    </Provider>,
    container[0]
    );