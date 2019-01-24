import * as ActionTypes from './../constants/actions'

const initialState = {
//   loadingStates: true,
//   loadingCities: true,
//   loadingCityDetails: true,
//   loadingFenceDetails: true,
//   loadingGeolocalities: true,
//   loadingMappedLocalities: true,
//   loadingMappedRetailers: true,
//   loadingRetailers: true,
//   loadingUnmappedRetailersToDp: true,
//   loadingDeliverers: true,
//   loadingMappedRetailersToLocality: true,
//   loadingUnmappedRetailersToLocality: true,
//   loadingUnmappedDpToLocality: true,
//   loadingUnmappedLocalitiesToDp: true,
//   loadingMappedDpToLocality: true,
//   loadingImageAds: true,
//   loadingCollectionAds: true,
//   loadingContactNumbersOfRetailer: true,
//   loadingAllCollections: true,
//   loadingBrandsInCollection: true,
//   loadingTransactionCode: true,
//   updatingListingOrder: true,
//   //updatingSkuStateMap: true,
loadingStatesMappedToSku: true,
loadingSkuUnmappedStates: true,
loadingSkuMappedRetailers: true,
//   loadingCategoriesList: true,
//   //loadingAllBrands: true,
//   loadingBrandsMappedToCategories: true,
//   loadingUnmappedBrandList: true,
//   loadingMappedBrandList: true,
//   loadingCompanyList: true,
//   //verifyingTransaction: true,
//   loadingCredits: true,
loadingSkuList: true,
loadingBrandList: true,
loadingBrandDetails: true,
//   loadingVolumeList: true,
//   //loadingAllBrands: true,
loadingOriginList: true,
loadingBrandTypeList: true,
loadingStates: true,
//   contactNumbersOfRetailer: [],
//   imageAdsData: [],
//   collectionAdsData: [],
//   geoFenceCheckData: [],
//   unmappedRetailersToLocality: [],
//   unmappedRetailersToDp: [],
//   unmappedLocalitiesToDp: [],
//   unmappedDpToLocality: [],
//   mappedRetailersToLocality: [],
//   mappedDpToLocality: [],
//   retailers: [],
//   mappedRetailers: [],
//   mappedLocalities: [],
//   statesData: [],
//   citiesData: [],
//   deliverers: [],
//   geoLocalitiesData: [],
//   collectionsList: {},
//brandList: [],
originList: [],
brandTypeList: [],
statesList: [],
//   cityDetails: {},
//   collectionsCount: 0,
//   brandCount: 0,
//   cityDetails: {},
//   transactionCodes: [],
//   addCreditsFormDetails: {},
//   customerDetails: [],
//   validCreditsData: [],
//   volumeList: [],
skuList: [],
brands: [],
brandList: [],
liveOrdersData: [],
//   brandDetails: [],
mappedStatesToSkuData: [],
mappedRetailersData: [],
skuUnmappedStates: [],
//   skuUnmappedRetailers: [],
//   //totalBrandsCount: [],
//   categoriesList: [],
//   brandsMappedToCategories: [],
//   unmappedBrandList: [],
//   mappedBrandList: [],
//   companyList: [],
//   totalCategoriesCount: 0,
//   validCreditsCount: 0,
totalSkuCount: 0,
totalBrandCount: 0,
totalBrandListCount: 0,
//   brandListCount: 0,
//   brandsMappedToCategoriesCount: 0,
//   unmappedBrandListCount: 0,
//   mappedBrandListCount: 0,
//   totalCompanies: 0
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_SKUS]: (state, action) => {
    //console.log("success")
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

  [ActionTypes.SUCCESS_FETCH_LIVE_ORDERS]: (state, action) => {
    // console.log("data", action)
    return Object.assign({}, state, {
      //loadingLiveOrders: false,
      liveOrdersData: action.data.orders,
      //liveOrdersCount: action.data.count,
    })
  },
  // [ActionTypes.SUCCESS_FETCH_STATES]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingStates: false,
  //     statesData: action.data.states
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_CITIES]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingCities: false,
  //     citiesData: action.data.cities,
  //     citiesCount: action.data.count
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_LOCALITIES]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingGeolocalities: false,
  //     geoLocalitiesData: action.data
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_CITY_DETAILS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingCityDetails: false,
  //     cityDetails: action.data.states
  //   })
  // },

  // [ActionTypes.SUCCESS_SET_LOADING_STATE]: (state, action) => {
  //   if (action.data) {
  //     return Object.assign({}, state, {
  //       [action.data]: true
  //     })
  //   }
  //   return Object.assign({}, state, {
  //     loadingStates: true,
  //     loadingCities: true,
  //     loadingCityDetails: true,
  //     loadingFenceDetails: true,
  //     loadingGeolocalities: true,
  //     loadingMappedLocalities: true,
  //     loadingMappedRetailers: true,
  //     loadingRetailers: true,
  //     loadingMappedRetailersToLocality: true,
  //     loadingUnmappedRetailersToLocality: true,
  //     loadingUnmappedDpToLocality: true,
  //     loadingUnmappedLocalitiesToDp: true,
  //     loadingMappedDpToLocality: true,
  //     loadingImageAds: true,
  //     loadingAllCollections: true,
  //     loadingBrandsInCollection: true,
  //     updatingListingOrder: true,
  //     loadingSkuList: true,
         loadingBrandList: true,
  //     loadingVolumeList: true,
  //     loadingSkuDetails: true,
  //     loadingSkuUnmappedStates: true,
  //     loadingSkuMappedRetailers: true,
  //     loadingCategoriesList: true,
  //     //loadingAllBrands: true,
  //     loadingOriginList: true,
  //     loadingBrandTypeList: true,
  //     loadingBrandsMappedToCategories: true,
  //     loadingUnmappedBrandList: true,
  //     loadingMappedBrandList: true,
  //     loadingCompanyList: true
  //     //loadingAllBrands: true
  //     //updatingSkuStateMap: true
  //   })
  // },
  
  // [ActionTypes.SUCCESS_FETCH_DELIVERERS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingDeliverers: false,
  //     deliverers: action.data.dp
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_RETAILERS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingRetailers: false,
  //     retailers: action.data
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_DP_RETAILER_MAP]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingMappedRetailers: false,
  //     mappedRetailers: action.data.retailers
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_DP_LOCALITY_MAP]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingMappedLocalities: false,
  //     mappedLocalities: action.data.localities
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_LOCALITY_RETAILERS_MAP]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingMappedRetailersToLocality: false,
  //     mappedRetailersToLocality: action.data.retailers
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_UNMAPPED_RETAILERS_TO_LOCALITY]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingUnmappedRetailersToLocality: false,
  //     unmappedRetailersToLocality: action.data.retailers
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_UNMAPPED_DP_TO_LOCALITY]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingUnmappedDpToLocality: false,
  //     unmappedDpToLocality: action.data.dp
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_UNMAPPED_LOCALITIES_TO_DP]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingUnmappedLocalitiesToDp: false,
  //     unmappedLocalitiesToDp: action.data.localities
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_UNMAPPED_RETAILERS_TO_DP]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingUnmappedRetailersToDp: false,
  //     unmappedRetailersToDp: action.data.retailers
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_DP_BY_LOCALITY]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingMappedDpToLocality: false,
  //     mappedDpToLocality: action.data.dp
  //   })
  // },

  // [ActionTypes.SUCCESS_GET_FENCE_DETAILS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingFenceDetails: false,
  //     fenceDetails: action.data
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_IMAGE_ADS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingImageAds: false,
  //     imageAdsData: action.data
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_COLLECTION_ADS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingCollectionAds: false,
  //     collectionAdsData: action.data
  //   })
  // },

  // [ActionTypes.SUCCESS_GEO_FENCE_CHECK]: (state, action) => {
  //   const geoFenceCheckData = state.geoFenceCheckData.slice()
  //   if (action.data.title === 'Retailer outside Locality') {
  //     action.data.status = 'warning'
  //   }
  //   geoFenceCheckData.push(action.data)
  //   return Object.assign({}, state, {
  //     geoFenceCheckData
  //   })
  // },

  // [ActionTypes.SUCCESS_EMPTY_GEO_FENCE_CHECK_DATA]: (state) => {
  //   return Object.assign({}, state, {
  //     geoFenceCheckData: []
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_CONTACT_NUMBERS_OF_RETAILER]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingContactNumbersOfRetailer: false,
  //     contactNumbersOfRetailer: action.data
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_COLLECTIONS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingAllCollections: false,
  //     collectionsList: action.data.ads_data,
  //     collectionsCount: action.data.count
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_BRANDS_IN_COLLECTION]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingBrandsInCollection: false,
  //     brandList: action.data.bucket,
  //     brandCount: action.data.count
  //   })
  // },

  // [ActionTypes.SUCCESS_TRANSACTION_CODE]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingTransactionCode: false,
  //     transactionCodes: action.data
  //   })
  // },

  // [ActionTypes.SUCCESS_UPDATE_TRANSACTION_LIST]: (state, action) => {
  //   let customerDetails = state.customerDetails.filter((item) => {
  //     if(item.email !== action.data.data) {
  //       return item
  //     }
  //   })

  //   return Object.assign({}, state, {
  //     customerDetails: customerDetails,
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_CREDITS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingCredits: false,
  //     validCreditsData: action.data.data,
  //     validCreditsCount: action.data.count
  //   })
  // },

  // [ActionTypes.SUCCESS_UPDATE_BRAND_LISTING_ORDER]: (state, action) => {
  //   return Object.assign({}, state, {
  //     updatingListingOrder: false
  //   })
  // },

  // //
  
  // [ActionTypes.SUCCESS_FETCH_VOLUME_LIST]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingVolumeList: false,
  //     volumeList: action.data
  //   })
  // },
  
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

  // [ActionTypes.SUCCESS_FETCH_UNMAPPED_STATES]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingSkuUnmappedStates: false,
  //     skuUnmappedStates: action.data
  //   })
  // },

  [ActionTypes.SUCCESS_FETCH_RETAILERS_MAPPED_TO_SKU]: (state, action) => {
    return Object.assign({}, state, {
      loadingSkuMappedRetailers: false,
      mappedRetailersData: action.data
    })
  },

  // [ActionTypes.SUCCESS_FETCH_CATEGORIES]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingCategoriesList: false,
  //     categoriesList: action.data.categoriesList,
  //     totalCategoriesCount: action.data.count
  //   })
  // },

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
  },

  // [ActionTypes.SUCCESS_FETCH_BRANDS_MAPPED_TO_CATEGORIES]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingBrandsMappedToCategories: false,
  //     brandsMappedToCategories: action.data.brandsMappedToCategories,
  //     brandsMappedToCategoriesCount: action.data.count
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_UNMAPPED_BRAND_LIST]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingUnmappedBrandList: false,
  //     unmappedBrandListCount: action.data.count,
  //     unmappedBrandList: action.data.brandList
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_MAPPED_BRAND_LIST]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingMappedBrandList: false,
  //     mappedBrandListCount: action.data.count,
  //     mappedBrandList: action.data.brandList
  //   })
  // },

  // [ActionTypes.SUCCESS_FETCH_COMPANIES]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingCompanyList: false,
  //     totalCompanies: action.data.count,
  //     companyList: action.data.companyList
  //   })
  // },
  
  // [ActionTypes.SUCCESS_FETCH_ALL_BRANDS]: (state, action) => {
  //   return Object.assign({}, state, {
  //     loadingAllBrands: false,
  //     brandDetails: action.data.brands,
  //     brandListCount: action.data.count
  //   })
  // },

  // [ActionTypes.SUCCESS_VERIFY_TRANSACTION]: (state, action) => {

  //   let transactions = [];

  //   transactions = state.addCreditsFormDetails.emailIds.map((email, i) => {
  //     let transactionDetail = {
  //       id : '',
  //       fullname : ''
  //     }
  //     transactionDetail = action.data.filter((transaction) => {
  //       if(transaction.email === email) {
  //         return transaction
  //       }
  //     })

  //     return {
  //       id : transactionDetail.length > 0 ? transactionDetail[0].id : '',
  //       name: transactionDetail.length > 0 ? transactionDetail[0].full_name : 'NOT FOUND',
  //       email,
  //       transactionId: state.addCreditsFormDetails.transactionId,
  //       transactionCode: state.addCreditsFormDetails.transactionCode,
  //       amount: state.addCreditsFormDetails.amount,
  //       batchNo: state.addCreditsFormDetails.batchNo,
  //       reason: state.addCreditsFormDetails.comment,
  //       valid: transactionDetail.length > 0 && transactionDetail[0].id > 0 ? true : false
  //     }
  //   })

  //   return Object.assign({}, state, {
  //     //verifyingTransaction: false,
  //     customerDetails: transactions
  //   })
  // }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}

// const initialState = {
//   //data: {}
//   skuList: []
// }

// const repoReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SUCCESS_FETCH_REPOS':
//       // const newData = { data: [1] }
//         return { ...state, data: action.data  }
//       default:
//         return state;
//     }
// }

// export default repoReducer
