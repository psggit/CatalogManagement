import * as ActionTypes from './../constants/actions'

export const fetchSKUs = (data) => ({
  type: ActionTypes.REQUEST_FETCH_SKUS,
  data
})

export const fetchBrands = (data) => ({
  type: ActionTypes.REQUEST_FETCH_BRANDS,
  data
})

export const fetchGenres = (data) => ({
  type: ActionTypes.REQUEST_FETCH_GENRES,
  data
})

export const fetchGenreList = (data) => ({
  type: ActionTypes.REQUEST_FETCH_GENRE_LIST,
  data
})

export const fetchBrandList = (data) => ({
  type: ActionTypes.REQUEST_FETCH_BRAND_LIST,
  data
})

export const fetchLiveOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_LIVE_ORDERS,
  data
})

export const createSku = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_SKU,
  data,
  CB
})

export const createGenre = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_GENRE,
  data,
  CB
})

export const updateGenre = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_GENRE,
  data,
  CB
})

export const updateGenreStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_GENRE_STATUS,
  data,
  CB
})

export const updateSku = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_SKU,
  data,
  CB
})

export const updateSKUStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_SKU_STATUS,
  data,
  CB
})

export const fetchStates = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_STATES,
  data,
  CB
})

export const fetchStatesMappedToSku = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_STATES_MAPPED_TO_SKU,
  data,
  CB
})

export const updateSkuStateMap = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_SKU_STATE_MAP,
  data,
  CB
})

export const fetchSkuUnmappedStates = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_STATES,
  data,
  CB
})

export const mapStateToSku = (data, CB) => ({
  type: ActionTypes.REQUEST_MAP_STATE_TO_SKU,
  data,
  CB
})

export const fetchRetailersMappedToSku = (data) => ({
  type: ActionTypes.REQUEST_FETCH_RETAILERS_MAPPED_TO_SKU,
  data
})

export const updateSkuRetailerMap = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_SKU_RETAILER_MAP,
  data,
  CB
})

export const fetchSkuUnmappedRetailers = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_SKU_UNMAPPED_RETAILERS,
  data,
  CB
})

export const mapRetailerToSku = (data, CB) => ({
  type: ActionTypes.REQUEST_MAP_RETAILER_TO_SKU,
  data,
  CB
})

export const fetchGenreBasedBrandList = (data, CB) => ({
  type: ActionTypes.REQUEST_GENRE_BASED_BRAND_LIST,
  data,
  CB
})

export const fetchOriginList = (data) => ({
  type: ActionTypes.REQUEST_FETCH_ORIGIN_LIST,
  data
})

export const fetchBrandTypes = (data) => ({
  type: ActionTypes.REQUEST_FETCH_BRAND_TYPE_LIST,
  data
})

export const createBrand = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_BRAND,
  data,
  CB
})

export const setLoadingState = data => ({
  type: ActionTypes.REQUEST_SET_LOADING_STATE,
  data
})

export const updateBrand = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_BRAND,
  data,
  CB
})

export const updateBrandStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_BRAND_STATUS,
  data,
  CB
})




