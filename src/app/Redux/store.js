"use client"
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appReducer";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Saga/rootSaga";


 const sagaMiddleWare =createSagaMiddleware();

export const appStore = configureStore({
    reducer:{
        appReducer
    },
    middleware:()=>{
        return[logger,sagaMiddleWare]
    }

});

sagaMiddleWare.run(rootSaga);

