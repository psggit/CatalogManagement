import { GET, POST } from '@utils/fetch'

export const createSku = action => (
  POST({
    api: '/Api/createSku',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const createGenre = action => (
  POST({
    api: '/Api/createGenre',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const updateGenre = action => (
  POST({
    api: '/Api/updateGenre',
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

export const fetchGenres = action => (
  POST({
    api: '/Api/listGenre',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const fetchGenreList = action => (
  POST({
    api: '/Api/getGenreMap',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const createOrUpdateBrandListingOrder = action => (
  POST({
    api: '/Api/createorupdateListingOrder',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const fetchBrandListingOrder = action => (
  POST({
    api: '/Api/listListingOrderforGenreandState',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const updateGenreStatus = action => (
  POST({
    api: '/Api/changeGenreStatus',
    apiBase: 'catalog',
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

export const mapStateToSku = action => (
  POST({
    api: '/Api/createSkuPrice',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const updateSkuStateMap = action => (
  POST({
    api: '/Api/updateSkuPrice',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const fetchBrandCollection = action => (
  POST({
    api: '/Api/catalog/brand-collection/list',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const updateBrandCollectionStatus = action => (
  POST({
    api: '/Api/catalog/brand-collection/activate',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const createBrandCollection = action => (
  POST({
    api: '/Api/catalog/brand-collection/create',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

export const fetchBrands = action => (
  POST({
    api: '/Api/listBrandDetails',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

export const fetchAccessLogs = action => (
  POST({
    api: '/Api/catalog/accesslog',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

export const fetchGenreBasedBrandList = action => (
  POST({
    api: '/Api/getBrandforGenre',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
)

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
