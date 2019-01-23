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

function* fetchBrands(action) {
  try {
    const data = yield call(Api.fetchBrands, action)
    //const data = brandList
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRANDS, data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchBrandList(action) {
  try {
    const data = yield call(Api.fetchBrandList, action)
    //const data = brandList
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRAND_LIST, data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchLiveOrders(action) {
  try {
    //const data = yield call(Api.fetchLiveOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_LIVE_ORDERS, data})
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

// function* fetchVolumeList(action) {
//   try {
//     const data = yield call(Api.fetchVolumeList, action)
//     //const data = volumeList
//     yield put({ type: ActionTypes.SUCCESS_FETCH_VOLUME_LIST, data })
//   } catch(err) {
//     console.log(err)
//   }
// }

function* fetchSkuMappedStates(action) {
  try {
    const data = yield call(Api.fetchSkuMappedStates, action)
    //const data = mappedState
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATES_MAPPED_TO_SKU, data })
  } catch(err) {
    console.log(err)
  }
}

function* updateSkuStateMap(action) {
  try {
    //const data = yield call(Api.updateSkuStateMap, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SKU_STATE_MAP, data })
    Notify('Successfully updated sku', 'success')
    action.CB()
  } catch(err) {
    console.log(err)
    Notify('Error in updating sku', 'warning')
    action.CB()
  }
}

function* fetchSkuUnmappedStates(action) {
  try {
    //const data = yield call(Api.fetchSkuUnmappedStates, action)
    const data = unmappedStates
    yield put({ type: ActionTypes.SUCCESS_FETCH_UNMAPPED_STATES, data })
    //Notify('Successfully mapped the state', 'success')
    action.CB(data)
  } catch(err) {
    console.log(err)
  }
}

function* mapStateToSku(action) {
  try {
    //const data = yield call(Api.mapStateToSku, action)
    const data = createdSku
    //yield put({ type: ActionTypes.SUCCESS_MAP_STATE_TO_SKU, data })
    Notify('Successfully mapped the state', 'success')
    action.CB(data)
  } catch(err) {
    console.log(err)
    Notify('Error in mapping the state', 'warning')
  }
}

function* fetchRetailersmappedToSku(action) {
  try {
    //const data = yield call(Api.fetchSKUs, action)
    const data = retailersMappedToSku
    yield put({ type: ActionTypes.SUCCESS_FETCH_RETAILERS_MAPPED_TO_SKU, data })
    //Notify('Successfully mapped the state', 'success')
    //action.CB(data)
  } catch(err) {
    console.log(err)
  }
}

function* updateSkuRetailerMap(action) {
  try {
    //const data = yield call(Api.fetchSKUs, action)
    const data = createdSku
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SKU_RETAILER_MAP, data })
    Notify('Successfully updated retailer mapped to sku', 'success')
    action.CB(data)
    //Notify('Successfully mapped the state', 'success')
    //action.CB(data)
  } catch(err) {
    console.log(err)
  }
}

function* fetchSkuUnmappedRetailers(action) {
  try {
    //const data = yield call(Api.fetchSKUs, action)
    const data = unmappedRetailers
    yield put({ type: ActionTypes.SUCCESS_FETCH_SKU_UNMAPPED_RETAILERS, data })
    //Notify('Successfully mapped retailer to sku', 'success')
    action.CB(data)
    //Notify('Successfully mapped the state', 'success')
    //action.CB(data)
  } catch(err) {
    console.log(err)
  }
}

function* mapRetailerToSku(action) {
  try {
    //const data = yield call(Api.fetchSKUs, action)
    const data = createdSku
    //yield put({ type: ActionTypes.SUCCESS_MAP_RETAILER_TO_SKU, data })
    Notify('Successfully mapped retailer to sku', 'success')
    action.CB(data)
    //Notify('Successfully mapped the state', 'success')
    //action.CB(data)
  } catch(err) {
    console.log(err)
  }
}

// function* fetchCategories(action) {
//   try {
//     //const data = yield call(Api.fetchSKUs, action)
//     const data = categoriesList
//     yield put({ type: ActionTypes.SUCCESS_FETCH_CATEGORIES, data })
//     //Notify('Successfully mapped retailer to sku', 'success')
//     //action.CB(data)
//     //Notify('Successfully mapped the state', 'success')
//     //action.CB(data)
//   } catch(err) {
//     console.log(err)
//   }
// }

// function* createCategory(action) {
//   try {
//     //const data = yield call(Api.fetchSKUs, action)
//     const data = createdSku
//     yield put({ type: ActionTypes.SUCCESS_CREATE_CATEGORY, data })
//     Notify('Successfully created category', 'success')
//     action.CB(data)
//     setTimeout(() => {
//       window.location.href = `/home/manage-category`
//     }, 1000)
//     //Notify('Successfully mapped the state', 'success')
//     //action.CB(data)
//   } catch(err) {
//     console.log(err)
//   }
// }

function* fetchOriginList(action) {
  try {
    //const data = yield call(Api.fetchOriginList, action)
    const data = originList
    yield put({ type: ActionTypes.SUCCESS_FETCH_ORIGIN_LIST, data })
  } catch(err) {
    console.log(err)
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

// function* fetchBrandsMappedToCategories(action) {
//   try {
//     const data = brandMappedToCategories
//     yield put({ type: ActionTypes.SUCCESS_FETCH_BRANDS_MAPPED_TO_CATEGORIES, data })
//   } catch(err) {
//     console.log(err)
//   }
// } 

// function* fetchUnmappedBrands(action) {
//   try {
//     const data = unmappedBrandList
//     yield put({ type: ActionTypes.SUCCESS_FETCH_UNMAPPED_BRAND_LIST, data })
//   } catch(err) {
//     console.log(err)
//   }
// } 

// function* fetchMappedBrands(action) {
//   try {
//     const data = unmappedBrandList
//     yield put({ type: ActionTypes.SUCCESS_FETCH_MAPPED_BRAND_LIST, data })
//   } catch(err) {
//     console.log(err)
//   }
// }

// function* mapBrands(action) {
//   try {
//     const data = unmappedBrandList
//     yield put({ type: ActionTypes.SUCCESS_MAP_BRANDS, data })
//     Notify('Successfully mapped the brand', 'success')
//     setTimeout(() => {
//       window.location.href = `/home/manage-category/brands`
//     }, 1000)
//   } catch(err) {
//     console.log(err)
//   }
// } 

// function* unmapBrands(action) {
//   try {
//     const data = unmappedBrandList
//     yield put({ type: ActionTypes.SUCCESS_UNMAP_BRANDS, data })
//     Notify('Successfully unmapped the brand', 'success')
//     setTimeout(() => {
//       window.location.href = `/home/manage-category/brands`
//     }, 1000)
//   } catch(err) {
//     console.log(err)
//   }
// } 

// function* updateCategory(action) {
//   try {
//     const data = createdSku
//     yield put({ type: ActionTypes.SUCCESS_UPDATE_CATEGORY, data })
//     Notify('Successfully updated the category', 'success')
//     setTimeout(() => {
//       window.location.href = `/home/manage-category`
//     }, 1000)
//   } catch(err) {
//     console.log(err)
//   }
// } 

// function* fetchCompanies(action) {
//   try {
//     const data = companyList
//     yield put({ type: ActionTypes.SUCCESS_FETCH_COMPANIES, data })
//     //Notify('Successfully updated the category', 'success')
//     // setTimeout(() => {
//     //   window.location.href = `/home/manage-category`
//     // }, 1000)
//   } catch(err) {
//     console.log(err)
//   }
// } 

// function* createCompany(action) {
//   try {
//     const data = createdSku
//     yield put({ type: ActionTypes.SUCCESS_CREATE_COMPANY, data })
//     Notify('Successfully created company', 'success')
//     setTimeout(() => {
//       window.location.href = `/home/manage-company`
//     }, 1000)
//   } catch(err) {
//     console.log(err)
//   }
// }

// function* updateCompany(action) {
//   try {
//     const data = createdSku
//     yield put({ type: ActionTypes.SUCCESS_UPDATE_COMPANY, data })
//     Notify('Successfully updated company', 'success')
//     setTimeout(() => {
//       window.location.href = `/home/manage-company`
//     }, 1000)
//   } catch(err) {
//     console.log(err)
//   }
// }

// function* fetchMappedBrands(action) {
//   try {
//     const data = unmappedBrandList
//     yield put({ type: ActionTypes.SUCCESS_FETCH_UNMAPPED_BRAND_LIST, data })
//   } catch(err) {
//     console.log(err)
//   }
// }

// function* verifyTransaction(action) {
//   try {
//     const data = yield call(Api.verifyTransaction, action.data)
//     //const data = transactionCodes
//     yield put({ type: ActionTypes.SUCCESS_VERIFY_TRANSACTION, data })
//   } catch (err) {
//     console.log(err)
//   }
// }

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

function* watchRequestFetchBrandList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_BRAND_LIST, fetchBrandList)
  }
}

function* watchFetchLiveOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LIVE_ORDERS, fetchLiveOrders)
  }
}

function* watchRequestCreateSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_SKU, createSku)
  }
}

// function* watchRequestFetchVolumeList() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_FETCH_VOLUME_LIST, fetchVolumeList)
//   }
// }

function* watchRequestUpdateSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_SKU, updateSku)
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

function* watchRequestFetchSkuUnmappedStates() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_UNMAPPED_STATES, fetchSkuUnmappedStates)
  }
}

function* watchRequestMapStateToSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_MAP_STATE_TO_SKU, mapStateToSku)
  }
}

function* watchRequestFetchRetailersMappedToSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_RETAILERS_MAPPED_TO_SKU, fetchRetailersmappedToSku)
  }
}

function* watchRequestUpdateSkuRetailerMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_SKU_RETAILER_MAP, updateSkuRetailerMap)
  }
}

function* watchRequestFetchSkuUnmappedRetailers() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_SKU_UNMAPPED_RETAILERS, fetchSkuUnmappedRetailers)
  }
}

function* watchRequestMapRetailerToSku() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_MAP_RETAILER_TO_SKU, mapRetailerToSku)
  }
}

// function* watchRequestFetchCategories() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_FETCH_CATEGORIES, fetchCategories)
//   }
// }

// function* watchRequestCreateCategory() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_CREATE_CATEGORY, createCategory)
//   }
// }

function* watchRequestFetchOriginList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_ORIGIN_LIST, fetchOriginList)
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

// function* watchRequestFetchBrandsMappedToCategories() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_FETCH_BRANDS_MAPPED_TO_CATEGORIES, fetchBrandsMappedToCategories)
//   }
// }

// function* watchRequestFetchUnmappedBrands() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_FETCH_UNMAPPED_BRAND_LIST, fetchUnmappedBrands)
//   }
// }

// function* watchRequestMapBrands() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_MAP_BRANDS, mapBrands)
//   }
// } 

// function* watchRequestUnmapBrands() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_UNMAP_BRANDS, unmapBrands)
//   }
// }

// function* watchRequestUpdateCategory() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_UPDATE_CATEGORY, updateCategory)
//   }
// } 

// function* watchRequestFetchMappedBrands() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_FETCH_MAPPED_BRAND_LIST, fetchMappedBrands)
//   }
// }

// function* watchRequestFetchCompanyList() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_FETCH_COMPANIES, fetchCompanies)
//   }
// }

// function* watchRequestCreateCompany() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_CREATE_COMPANY, createCompany)
//   }
// }

// function* watchRequestUpdateCompany() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_UPDATE_COMPANY, updateCompany)
//   }
// }

export default function* rootSaga() {
  yield [
    fork(watchRequestFetchSKUs),
    fork(watchRequestFetchBrands),
    fork(watchRequestFetchBrandList),
    fork(watchFetchLiveOrders),
    fork(watchRequestCreateSku),
    // fork(watchRequestFetchVolumeList),
    fork(watchRequestUpdateSku),
    fork(watchRequestFetchStatesMappedToSku),
    fork(watchRequestUpdateSkuStateMap),
    fork(watchRequestFetchSkuUnmappedStates),
    fork(watchRequestMapStateToSku),
    fork(watchRequestFetchRetailersMappedToSku),
    fork(watchRequestUpdateSkuRetailerMap),
    fork(watchRequestFetchSkuUnmappedRetailers),
    fork(watchRequestMapRetailerToSku),
    // fork(watchRequestFetchCategories),
    // fork(watchRequestCreateCategory),
    fork(watchRequestFetchOriginList),
    fork(watchRequestFetchBrandTypes),
    fork(watchRequestCreateBrand),
    fork(watchRequestUpdateBrand),
    fork(watchRequestUpdateBrandStatus),
    // fork(watchRequestFetchBrandsMappedToCategories),
    // fork(watchRequestFetchUnmappedBrands),
    // fork(watchRequestMapBrands),
    // fork(watchRequestUpdateCategory),
    // fork(watchRequestFetchMappedBrands),
    // fork(watchRequestUnmapBrands),
    // fork(watchRequestFetchCompanyList),
    // fork(watchRequestCreateCompany),
    // fork(watchRequestUpdateCompany)
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
