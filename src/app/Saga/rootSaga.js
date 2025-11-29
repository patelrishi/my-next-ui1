import {all} from "redux-saga/effects";
import sudentSaga from "./sudentSaga";

function* rootSaga (){
    return yield all([sudentSaga()])
}

export default rootSaga;