import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import Notify from '@components/Notification'
import * as Api from './api'
import {skuList, brandList, originList, brandTypes, createdSku, volumeList, skuDetails, unmappedStates, mappedState, retailersMappedToSku, unmappedRetailers, categoriesList, brandMappedToCategories, unmappedBrandList, companyList} from './../../mock-data'

/**
 * Handlers
 */

function* fetchSKUs(action) {
  try {
    const data = yield call(Api.fetchSKUs, action)
    //const data = skuList
    yield put({ type: ActionTypes.SUCCESS_FETCH_SKUS, data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchGenres(action) {
  try {
    const data = yield call(Api.fetchGenres, action)
    //const data = brandList
    yield put({ type: ActionTypes.SUCCESS_FETCH_GENRES, data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchBrands(action) {
  try {
    const data = yield call(Api.fetchBrands, action)
    //const data = brandList
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRANDS, data })
  } catch(err) {
    console.log(err)
  }
}

function* createSku(action) {
  try {
    const data = yield call(Api.createSku, action)
    Notify('Successfully created sku', 'success')
    action.CB(data)
    setTimeout(() => {
      window.location.href = `/admin/manage-sku`
    }, 1000)
  } catch(err) {
    console.log(err)
    action.CB()
  }
}

function* updateSku(action) {
  try {
    const data = yield call(Api.updateSKU, action)
    Notify('Successfully updated sku', 'success')
    action.CB(data)
    setTimeout(() => {
      window.location.href = `/admin/manage-sku`
    }, 1000)
  } catch(err) {
    console.log(err)
  }
}

function* updateSKUStatus(action) {
  try {
    const data = yield call(Api.updateSKUStatus, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SKU_STATUS, data })
    Notify('Successfully updated the sku status', 'success')
    // setTimeout(() => {
    //   window.location.href = `/admin/manage-brand`
    // }, 1000)
    action.CB()
  } catch(err) {
    console.log(err)
    //action.CB()
  }
}

function* updateGenreStatus(action) {
  try {
    const data = yield call(Api.updateGenreStatus, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_GENRE_STATUS, data })
    Notify('Successfully updated the genre status', 'success')
    // setTimeout(() => {
    //   window.location.href = `/admin/manage-brand`
    // }, 1000)
    action.CB()
  } catch(err) {
    console.log(err)
    //action.CB()
  }
}

function* fetchStates(action) {
  try {
    const data = yield call(Api.fetchStates, action)
    //const data = mappedState
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATES, data })
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* fetchSkuMappedStates(action) {
  try {
    const data = yield call(Api.fetchSkuMappedStates, action)
    //const data = mappedState
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATES_MAPPED_TO_SKU, data })
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* updateSkuStateMap(action) {
  try {
    const data = yield call(Api.updateSkuStateMap, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SKU_STATE_MAP, data })
    Notify('Successfully updated sku', 'success')
    action.CB()
  } catch(err) {
    console.log(err)
    Notify('Error in updating sku', 'warning')
    action.CB()
  }
}

function* mapStateToSku(action) {
  try {
    const data = yield call(Api.mapStateToSku, action)
    //const data = createdSku
    //yield put({ type: ActionTypes.SUCCESS_MAP_STATE_TO_SKU, data })
    Notify('Successfully mapped the state', 'success')
    action.CB(data)
  } catch(err) {
    console.log(err)
    Notify('Error in mapping the state', 'warning')
  }
}

function* fetchBrandTypes(action) {
  try {
    const data = yield call(Api.fetchBrandTypes, action)
    //console.log("data", data)
    //const data = brandTypes
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRAND_TYPE_LIST, data })
  } catch(err) {
    console.log(err)
  }
}

function* createBrand(action) {
  try {
    const data = yield call(Api.createBrand, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_BRAND, data })
    Notify('Successfully created the brand', 'success')
    setTimeout(() => {
      window.location.href = `/admin/manage-brand`
    }, 1000)
    action.CB(data)
  } catch(err) {
    console.log(err)
    action.CB()
  }
}

function* createGenre(action) {
  try {
    const data = yield call(Api.createGenre, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_GENRE, data })
    Notify('Successfully created the genre', 'success')
    setTimeout(() => {
      window.location.href = `/admin/manage-genre`
    }, 1000)
    action.CB(data)
  } catch(err) {
    console.log(err)
    action.CB()
  }
}

function* updateBrand(action) {
  try {
    const data = yield call(Api.updateBrand, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_BRAND, data })
    Notify('Successfully updated the brand', 'success')
    setTimeout(() => {
      window.location.href = `/admin/manage-brand`
    }, 1000)
    action.CB(data)
  } catch(err) {
    console.log(err)
    action.CB()
  }
}

function* updateBrandStatus(action) {
  try {
    const data = yield call(Api.updateBrandStatus, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_BRAND_STATUS, data })
    Notify('Successfully updated the brand status', 'success')
    // setTimeout(() => {
    //   window.location.href = `/admin/manage-brand`
    // }, 1000)
    action.CB()
  } catch(err) {
    console.log(err)
    //action.CB()
  }
}

function* setLoadingState(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING_STATE, data: action.data })
  } catch (err) {
    console.log(err)
  }
}

/**
 * Watchers
 */
function* watchRequestFetchSKUs() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_SKUS, fetchSKUs)
  }
}

function* watchRequestFetchBrands() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_BRANDS, fetchBrands)
  }
}

function* watchRequestFetchGenres() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_GENRES, fetchGenres)
  }
}

function* watchRequestUpdateGenreStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_GENRE_STATUS, updateGenreStatus)
  }
}

function* watchRequestCreateSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_SKU, createSku)
  }
}

function* watchRequestCreateGenre() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_GENRE, createGenre)
  }
}

function* watchRequestUpdateSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_SKU, updateSku)
  }
}

function* watchRequestFetchStates() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_STATES, fetchStates)
  }
}

function* watchRequestFetchStatesMappedToSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_STATES_MAPPED_TO_SKU, fetchSkuMappedStates)
  }
}

function* watchRequestUpdateSkuStateMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_SKU_STATE_MAP, updateSkuStateMap)
  }
}

function* watchRequestMapStateToSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_MAP_STATE_TO_SKU, mapStateToSku)
  }
}

function* watchRequestFetchBrandTypes() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_BRAND_TYPE_LIST, fetchBrandTypes)
  }
}

function* watchRequestCreateBrand() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_BRAND, createBrand)
  }
}

function* watchRequestUpdateBrand() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_BRAND, updateBrand)
  }
}

function* watchRequestUpdateBrandStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_BRAND_STATUS, updateBrandStatus)
  }
}

function* watchRequestUpdateSKUStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_SKU_STATUS, updateSKUStatus)
  }
}

function* watchSetLoadingState() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_LOADING_STATE, setLoadingState)
  }
}

export default function* rootSaga() {
  yield [
    fork(watchRequestFetchSKUs),
    fork(watchRequestFetchBrands),
    fork(watchRequestCreateSku),
    fork(watchSetLoadingState),
    fork(watchRequestUpdateSku),
    fork(watchRequestUpdateSKUStatus),
    fork(watchRequestFetchStates),
    fork(watchRequestFetchStatesMappedToSku),
    fork(watchRequestUpdateSkuStateMap),
    fork(watchRequestMapStateToSku),
    fork(watchRequestFetchBrandTypes),
    fork(watchRequestCreateBrand),
    fork(watchRequestUpdateBrand),
    fork(watchRequestUpdateBrandStatus),
    fork(watchRequestFetchGenres),
    fork(watchRequestUpdateGenreStatus),
    fork(watchRequestCreateGenre)
  ]
}

// import { call, put } from 'redux-saga/effects'
// import * as Api from './api'

// export function* loadUserDetails(action) {
//     try {
//         const data = yield call(Api.fetchUserDetails, action);
//         yield put({ type: 'SUCCESS_FETCH_REPOS', data }); // Yields effect to the reducer specifying the action type and user details
//     } catch (error) {
//         throw error;
//     }
// }
