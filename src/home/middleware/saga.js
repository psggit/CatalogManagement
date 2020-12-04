import { all, takeLatest, delay } from 'redux-saga/effects'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import Notify from '@components/Notification'
import * as Api from './api'
import { skuList, brandList, originList, brandTypes, createdSku, volumeList, skuDetails, unmappedStates, mappedState, retailersMappedToSku, unmappedRetailers, categoriesList, brandMappedToCategories, unmappedBrandList, companyList } from './../../mock-data'

/**
 * Handlers
 */

function* fetchSKUs(action) {
  try {
    const data = yield call(Api.fetchSKUs, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_SKUS, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchGenres(action) {
  try {
    const data = yield call(Api.fetchGenres, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_GENRES, data })
    //action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* fetchGenreList(action) {
  try {
    const data = yield call(Api.fetchGenreList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_GENRE_LIST, data })
    //action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* fetchBrands(action) {
  try {
    const data = yield call(Api.fetchBrands, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRANDS, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchBrandCollectionList(action) {
  try {
    const data = yield call(Api.fetchBrandCollection, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRAND_COLLECTION_LIST, data })
  } catch (err) {
    Notify(err.message, 'warning')
    console.log(err)
  }
}

function* updateBrandCollectionStatus(action) {
  try {
    const data = yield call(Api.updateBrandCollectionStatus, action)
    Notify(data.message, 'success')
    action.CB(data)
    setTimeout(() => {
      window.location.href = `/admin/manage-brand-collection`
    }, 1000)
  } catch (err) {
    Notify(err.message, 'warning')
    console.log(err)
  }
}

function* createBrandCollection(action) {
  try {
    const data = yield call(Api.createBrandCollection, action)
    Notify(data.message, 'success')
    action.CB(data)
    setTimeout(() => {
      window.location.href = `/admin/manage-brand-collection`
    }, 1000)
  } catch (err) {
    console.log(err)
    Notify(err.message, 'warning')
    action.CB()
  }
}

function* updateBrandCollection(action) {
  try {
    const data = yield call(Api.editBrandCollection, action)
    Notify(data.message, 'success')
    action.CB(data)
    setTimeout(() => {
      window.location.href = `/admin/manage-brand-collection`
    }, 1000)
  } catch (err) {
    console.log(err)
    Notify(err.message, 'warning')
    action.CB()
  }
}

function* fetchBrandListingOrder(action) {
  //console.log("hello", action)
  //let data = action.action.data
  try {
    const data = yield call(Api.fetchBrandListingOrder, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRAND_LISTING_ORDER, data })
    action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* createOrUpdateBrandListingOrder(action) {
  try {
    const data = yield call(Api.createOrUpdateBrandListingOrder, action)
    Notify('Successfully updated brand listing order', 'success')
    yield put({ type: ActionTypes.SUCCESS_CREATE_OR_UPDATE_BRAND_LISTING_ORDER, data })
    action.CB()
  } catch (err) {
    console.log(err)
    Notify('Something went wrong', 'warning')
    action.CB()
  }
}

function* fetchGenreBasedBrandList(action) {
  try {
    const data = yield call(Api.fetchGenreBasedBrandList, action)
    yield put({ type: ActionTypes.SUCCESS_GENRE_BASED_BRAND_LIST, data })
    yield put({
      type: ActionTypes.REQUEST_FETCH_BRAND_LISTING_ORDER,
      data: { genre_id: action.data.genre_id, state_id: action.data.state_id },
      CB: action.CB
    })
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    console.log(err)
  }
}

function* updateSKUStatus(action) {
  try {
    const data = yield call(Api.updateSKUStatus, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SKU_STATUS, data })
    Notify('Successfully updated the sku status', 'success')
    action.CB()
  } catch (err) {
    console.log(err)
    //action.CB()
  }
}

function* updateGenreStatus(action) {
  try {
    const data = yield call(Api.updateGenreStatus, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_GENRE_STATUS, data })
    Notify('Successfully updated the genre status', 'success')
    action.CB()
  } catch (err) {
    console.log(err)
    //action.CB()
  }
}

function* fetchStates(action) {
  try {
    const data = yield call(Api.fetchStates, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATES, data })
    action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* fetchSkuMappedStates(action) {
  try {
    const data = yield call(Api.fetchSkuMappedStates, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATES_MAPPED_TO_SKU, data })
    action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* updateSkuStateMap(action) {
  try {
    const data = yield call(Api.updateSkuStateMap, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SKU_STATE_MAP, data })
    Notify('Successfully updated sku', 'success')
    action.CB()
  } catch (err) {
    console.log(err)
    Notify('Error in updating sku', 'warning')
    action.CB()
  }
}

function* mapStateToSku(action) {
  try {
    const data = yield call(Api.mapStateToSku, action)
    Notify('Successfully mapped the state', 'success')
    action.CB(data)
  } catch (err) {
    console.log(err)
    Notify('Error in mapping the state', 'warning')
  }
}

function* fetchBrandTypes(action) {
  try {
    const data = yield call(Api.fetchBrandTypes, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRAND_TYPE_LIST, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchCollection(action) {
  try {
    const data = yield call(Api.fetchCollection, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_COLLECTION, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchAccessLogs(action) {
  try {
    const data = yield call(Api.fetchAccessLogs, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_ACCESS_LOGS, data })
  } catch (err) {
    console.log(err)
  }
}

function* createBrand(action) {
  try {
    const data = yield call(Api.createBrand, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_BRAND, data })
    Notify('Successfully created the brand', 'success')
    action.CB(data)
    setTimeout(() => {
      window.location.href = `/admin/manage-brand`
    }, 1000)
  } catch (err) {
    console.log(err)
    Notify('Something went wrong', 'warning')
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
  } catch (err) {
    console.log(err)
    Notify('Something went wrong', 'warning')
    action.CB()
  }
}

function* updateGenre(action) {
  try {
    const data = yield call(Api.updateGenre, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_GENRE, data })
    Notify('Successfully updated the genre', 'success')
    setTimeout(() => {
      window.location.href = `/admin/manage-genre`
    }, 1000)
    action.CB(data)
  } catch (err) {
    console.log(err)
    Notify('Something went wrong', 'warning')
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
  } catch (err) {
    console.log(err)
    Notify('Something went wrong', 'warning')
    action.CB()
  }
}

function* updateBrandStatus(action) {
  try {
    const data = yield call(Api.updateBrandStatus, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_BRAND_STATUS, data })
    Notify('Successfully updated the brand status', 'success')
    action.CB()
  } catch (err) {
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
  yield takeLatest(ActionTypes.REQUEST_FETCH_SKUS, fetchSKUs)
}

function* watchRequestFetchBrands() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_BRANDS, fetchBrands)
}

function* watchRequestFetchBrandCollectionList() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_BRAND_COLLECTION_LIST, fetchBrandCollectionList)
}

function* watchRequestUpdateBrandCollectionStatus() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_BRAND_COLLECTION_STATUS, updateBrandCollectionStatus)
}

function* watchRequestCreateBrandCollection() {
  yield takeLatest(ActionTypes.REQUEST_CREATE_BRAND_COLLECTION, createBrandCollection)
}

function* watchRequestFetchGenreBasedBrandList() {
  yield takeLatest(ActionTypes.REQUEST_GENRE_BASED_BRAND_LIST, fetchGenreBasedBrandList)
}

function* watchRequestFetchGenres() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_GENRES, fetchGenres)
}

function* watchRequestFetchGenreList() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_GENRE_LIST, fetchGenreList)
}

function* watchRequestUpdateGenreStatus() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_GENRE_STATUS, updateGenreStatus)
}

function* watchRequestCreateSku() {
  yield takeLatest(ActionTypes.REQUEST_CREATE_SKU, createSku)
}

function* watchRequestFetchBrandListingOrder() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_BRAND_LISTING_ORDER, fetchBrandListingOrder)
}

function* watchRequestCreateGenre() {
  yield takeLatest(ActionTypes.REQUEST_CREATE_GENRE, createGenre)
}

function* watchRequestUpdateGenre() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_GENRE, updateGenre)
}

function* watchRequestFetchAccessLogs() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_ACCESS_LOGS, fetchAccessLogs)
}

function* watchRequestUpdateSku() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_SKU, updateSku)
}

function* watchRequestFetchStates() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_STATES, fetchStates)
}

function* watchRequestFetchStatesMappedToSku() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_STATES_MAPPED_TO_SKU, fetchSkuMappedStates)
}

function* watchRequestUpdateSkuStateMap() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_SKU_STATE_MAP, updateSkuStateMap)
}

function* watchRequestMapStateToSku() {
  yield takeLatest(ActionTypes.REQUEST_MAP_STATE_TO_SKU, mapStateToSku)
}

function* watchRequestFetchBrandTypes() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_BRAND_TYPE_LIST, fetchBrandTypes)
}

function* watchRequestFetchCollection() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_COLLECTION, fetchCollection)
}

function* watchRequestCreateBrand() {
  yield takeLatest(ActionTypes.REQUEST_CREATE_BRAND, createBrand)
}

function* watchRequestCreateOrUpdateBrandListingOrder() {
  yield takeLatest(ActionTypes.REQUEST_CREATE_OR_UPDATE_BRAND_LISTING_ORDER, createOrUpdateBrandListingOrder)
}

function* watchRequestUpdateBrand() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_BRAND, updateBrand)
}

function* watchRequestUpdateBrandCollection() {
  yield takeLatest(ActionTypes.REQUEST_EDIT_BRAND_COLLECTION, updateBrandCollection)
}

function* watchRequestUpdateBrandStatus() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_BRAND_STATUS, updateBrandStatus)
}

function* watchRequestUpdateSKUStatus() {
  yield takeLatest(ActionTypes.REQUEST_UPDATE_SKU_STATUS, updateSKUStatus)
}

function* watchSetLoadingState() {
  yield takeLatest(ActionTypes.REQUEST_SET_LOADING_STATE, setLoadingState)
}

export default function* rootSaga() {
  yield all([
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
    fork(watchRequestFetchCollection),
    fork(watchRequestCreateBrand),
    fork(watchRequestUpdateBrand),
    fork(watchRequestUpdateBrandStatus),
    fork(watchRequestFetchGenres),
    fork(watchRequestUpdateGenreStatus),
    fork(watchRequestCreateGenre),
    fork(watchRequestUpdateGenre),
    fork(watchRequestFetchGenreList),
    fork(watchRequestFetchGenreBasedBrandList),
    fork(watchRequestFetchBrandListingOrder),
    fork(watchRequestFetchAccessLogs),
    fork(watchRequestCreateOrUpdateBrandListingOrder),
    fork(watchRequestFetchBrandCollectionList),
    fork(watchRequestUpdateBrandCollectionStatus),
    fork(watchRequestCreateBrandCollection),
    fork(watchRequestUpdateBrandCollection)
  ])
}