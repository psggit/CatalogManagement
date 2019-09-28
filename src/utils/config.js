
function getAPIObj() {
  if ((window.location.href.split(':')[1] === '//localhost') || (window.location.hostname.split('.')[0] === "catalog-local")) {
    
    let scheme = 'https'
    let baseHost = '.hipbar-dev.com'
    let appName = 'hipbar-dev.com'
    return {
      authUrl: 'https://auth.' + appName,
      blogicUrl: 'https://api1.' + appName,
      gremlinUrl: scheme + '://gremlin' + baseHost,
      odin: scheme + '://odin' + baseHost,
      catman: scheme + '://catman' + baseHost,
      orderman: scheme + '://orderman' + baseHost,
      socketUrl: 'https://livered' + baseHost,
      api2: 'https://api2.' + appName,
      catalog: 'https://catalog.' + appName,
      retailer: 'https://retailer.' + appName
    }
  } else {
    let scheme = window.location.href.split(':')[0]
    let baseHost = window.location.hostname.match(/.*?(\..*)/)[1]
    let subdomain = window.location.hostname.split('.')[0]
    // let authUrl = subdomain === 'support' || subdomain === 'delivery'
    //               ? scheme + '://auth' + baseHost
    //               : scheme + '://gremlin' + baseHost
    let authUrl =  scheme + '://auth' + baseHost

    return {
      authUrl: authUrl,
      blogicUrl: scheme + '://api1' + baseHost,
      gremlinUrl: scheme + '://gremlin' + baseHost,
      odin: scheme + '://odin' + baseHost,
      catman: scheme + '://catman' + baseHost,
      orderman: scheme + '://orderman' + baseHost,
      socketUrl: scheme + '://livered' + baseHost,
      api2: scheme + '://api2' + baseHost,
      catalog: scheme + '://catalog' + baseHost,
      retailer: scheme + '://retailer' + baseHost
    }
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()
