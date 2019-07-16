export function getOffsetUsingPageNo(pageNo, itemsCountPerPage) {
  return itemsCountPerPage * (pageNo - 1)
}

export function getQueryParamByName(name, query = location.search.slice(1)) {
  const queryObj = query.split("&").reduce((a, b) => {
    if (b.split("=")[1] == 'true' || b.split("=")[1] == 'false') {
      a[b.split("=")[0]] = JSON.parse(b.split("=")[1])
    } else {
      a[b.split("=")[0]] = b.split("=")[1]
    }
    return a
  }, {})

  return queryObj[name]
}

export function getQueryUri(queryObj) {
  const queryUri = Object.entries(queryObj)
    .filter(obj => obj[1].length > 0)
    .map(obj => obj.join('='))
    .join('&')
  return "?" + queryUri
}

export function getPositionBasedOnContainer(el) {
  const { top, bottom, left, right } = el.getBoundingClientRect()
  const containerScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  return {
    top: top + containerScrollPos,
    bottom: bottom + containerScrollPos,
    left: left,
    right: right
  }
}

export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const colors = ["#ffb299", "#c186be", "#80e4e6", "#d1cecd", "#fbe180"]