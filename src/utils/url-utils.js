export function getBreadCrumbPath() {
  return decodeURI(location.pathname.slice(1))
}

export function getQueryUri(queryObj) {
  const queryUri = Object.entries(queryObj).map(obj => obj.join('=')).join('&')
  return queryUri
}

export function getUriFromBreadCrumb(path) {
  return path.split('/').map(item => item.split(' ').join('-')).join('/')
}

export function getQueryObj(queryUri) {
  if (!queryUri.length) return {}

  const queryObj = queryUri.replace(/%20/g, ' ').split('&').reduce((a, b) => {
    if (b.split("=")[1] == 'true' || b.split("=")[1] == 'false') {
      a[b.split("=")[0]] = JSON.parse(b.split("=")[1])
    } else {
      a[b.split("=")[0]] = b.split("=")[1]
    }
    return a
  }, {})

  return queryObj
}
