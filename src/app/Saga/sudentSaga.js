import {call, takeLatest, put} from 'redux-saga/effects';
import { Ajax } from '../Services/Ajax';


function* getStudents (){
       const res = yield call(Ajax.sendGetReq, '/std/get-student');
       yield put({type:'STUDENTS', payload:res.data }) //that DB data store into students variable inside appStore.
}

function* sudentSaga (){
  yield takeLatest('GET_STUDENTSFUN', getStudents ) //first one is pattern second one is method it's calling that function
}

export default sudentSaga;