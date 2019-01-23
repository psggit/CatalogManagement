import { GET, POST } from '@utils/fetch'

export const createSku = action => (
  POST({
    api: '/Api/createSku',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const fetchSKUs = action => (
  POST({
    api: '/Api/listSku',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const updateSKU = action => (
  POST({
    api: '/Api/updateSku',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const updateSKUStatus = action => (
  POST({
    api: '/Api/changeSkuStatus',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const fetchStates = action => (
  POST({
    api: '/Api/listStates',
    apiBase: 'retailer',
    data: action.data,
    handleError: true
  })
) 

export const fetchSkuMappedStates = action => (
  POST({
    api: '/Api/listSkuPrice',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const fetchSkuUnmappedStates = action => (
  POST({
    api: '/SkuManagement/unmappedStatesList',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

// export const mapStateToSku = action => (
//   POST({
//     api: '/SkuManagement/createSkuStateMap',
//     apiBase: 'catalogsystem',
//     data: action.data,
//     handleError: true
//   })
// ) 

// export const updateSkuStateMap = action => (
//   POST({
//     api: '/SkuManagement/updateSkuStateMap',
//     apiBase: 'catalogsystem',
//     data: action.data,
//     handleError: true
//   })
// ) 

export const fetchBrands = action => (
  POST({
    api: '/Api/listBrandDetails',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

export const fetchBrandList = action => (
  POST({
    api: '/Api/listBrands',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

// export const fetchLiveOrders = action => (
//   POST({
//     api: '/deliveryStatus/liveOrders',
//     apiBase: 'gremlinUrl',
//     data: action.data,
//     handleError: true
//   })
//   .then(json => json)
// )

// export function fetchLiveOrders(action) {
//   //console.log("fetch live orders")
//   return POST({
//     api: `/deliveryStatus/liveOrders`,
//     apiBase: 'gremlinUrl',
//     handleError: true,
//     data: action.data
//   })
//   .then(((json) => {
//     console.log("action", json)
//   }))
// }

export const createBrand = action => (
  POST({
    api: '/Api/createBrand',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
) 

export const updateBrand = action => (
  POST({
    api: '/Api/updateBrand',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

export const updateBrandStatus = action => (
  POST({
    api: '/Api/changeBrandStatus',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

export const fetchBrandTypes = action => (
  POST({
    api: '/Api/listBrandType',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const fetchOriginList = action => (
  POST({
    api: '/SkuManagement/brand/originList',
    apiBase: 'catalogsystem',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

// export function fetchUserDetails(action) {
//   return fetch(`https://api.github.com/users/${action.data}`)
//   .then((response) => {
//       return response.json() 
//   })
//   .catch((error) => {
//       console.log("Error in fetching data", error);
//   });
// }