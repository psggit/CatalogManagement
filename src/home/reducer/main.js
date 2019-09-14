import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingStatesMappedToSku: true,
  loadingSkuUnmappedStates: true,
  loadingSkuMappedRetailers: true,
  loadingSkuList: true,
  loadingBrandList: true,
  loadingBrandDetails: true,
  loadingOriginList: true,
  loadingBrandTypeList: true,
  loadingBrandListingOrder: true,
  loadingStates: true,
  loadingGenreList: true,
  loadingGenreBasedBrandList: true,
  loadingGenres: true,
  loadingAccessLogs: true,
  creatingBrandListingOrder: true,
  originList: [],
  brandTypeList: [],
  statesList: [],
  accessLogs: [],
  skuList: [],
  brands: [],
  brandList: [],
  genreList: [],
  genres: [],
  genreBasedBrandList: [],
  liveOrdersData: [],
  mappedStatesToSkuData: [],
  mappedRetailersData: [],
  skuUnmappedStates: [],
  brandListingOrder: [],
  totalSkuCount: 0,
  totalBrandCount: 0,
  totalBrandListCount: 0,
  accessLogCount: 0,
  genreCount: 0
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_SKUS]: (state, action) => {
    console.log("success fetch skus")
    return Object.assign({}, state, {
      skuList: action.data.skuList,
      totalSkuCount: action.data.count,
      loadingSkuList: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_BRANDS]: (state, action) => {
    return Object.assign({}, state, {
      brands: action.data.brand_details,
      loadingBrandDetails: false,
      totalBrandCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_BRAND_LIST]: (state, action) => {
    return Object.assign({}, state, {
      brandList: action.data.brand_list,
      loadingBrandList: false,
      totalBrandListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_GENRE_BASED_BRAND_LIST]: (state, action) => {
    return Object.assign({}, state, {
      genreBasedBrandList: Object.entries(action.data).length !== 0 ? action.data.brand_list : [],
      loadingGenreBasedBrandList: false,
    })
  },

  [ActionTypes.SUCCESS_FETCH_BRAND_LISTING_ORDER]: (state, action) => {
    console.log("hell", action, Object.entries(action.data).length !== 0 ? action.data.brand_listing_order : [])
    return Object.assign({}, state, {
      brandListingOrder: Object.entries(action.data).length !== 0 ? action.data.brand_listing_order : [],
      loadingBrandListingOrder: false,
    })
  },

  [ActionTypes.SUCCESS_FETCH_ACCESS_LOGS]: (state, action) => {
    return Object.assign({}, state, {
      accessLogs: action.data.access_logs,
      loadingAccessLogs: false,
      accessLogCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_CREATE_OR_UPDATE_BRAND_LISTING_ORDER]: (state, action) => {
    console.log("hell", action)
    return Object.assign({}, state, {
      creatingBrandListingOrder: false,
    })
  },

  [ActionTypes.SUCCESS_FETCH_LIVE_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      liveOrdersData: action.data.orders,
    })
  },

  // [ActionTypes.SUCCESS_SET_LOADING_STATE]: (state, action) => {
  //   if (action.data) {
  //     return Object.assign({}, state, {
  //       [action.data]: true
  //     })
  //   }
  // },

  [ActionTypes.SUCCESS_SET_LOADING_STATE]: (state, action) => {
    return Object.assign({}, state, {
      loadingBrandDetails: true,
      brands: []
    })
  },

  [ActionTypes.SUCCESS_FETCH_GENRES]: (state, action) => {
    return Object.assign({}, state, {
      loadingGenreList: false,
      genreList: action.data.genres,
      genreCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_GENRE_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingGenres: false,
      genres: action.data.genreDetail,
      //genreCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_STATES]: (state, action) => {
    return Object.assign({}, state, {
      loadingStates: false,
      statesList: action.data.states
    })
  },

  [ActionTypes.SUCCESS_FETCH_STATES_MAPPED_TO_SKU]: (state, action) => {
    return Object.assign({}, state, {
      loadingStatesMappedToSku: false,
      mappedStatesToSkuData: action.data.skupricelist
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_STATES]: (state, action) => {
    return Object.assign({}, state, {
      loadingSkuUnmappedStates: false,
      skuUnmappedStates: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_SKU_UNMAPPED_RETAILERS]: (state, action) => {
    return Object.assign({}, state, {
      //loadingSkuUnmappedStates: false,
      skuUnmappedRetailers: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILERS_MAPPED_TO_SKU]: (state, action) => {
    return Object.assign({}, state, {
      loadingSkuMappedRetailers: false,
      mappedRetailersData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_ORIGIN_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingOriginList: false,
      originList: action.data.origin_list
    })
  },

  [ActionTypes.SUCCESS_FETCH_BRAND_TYPE_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingBrandTypeList: false,
      brandTypeList: action.data.brand_type
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}