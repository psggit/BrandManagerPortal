import { POST, GET } from "Utils/fetch";

export function authLogin(req) {
  return POST({
    api: "/login",
    apiBase: "auth",
    type: "Public",
    data: req
  })
}

export function authLogout(req) {
  return GET({
    api: "/user/logout",
    apiBase: "auth",
    type: "Public"
  })
}

export function authTokenInfo(req) {
  return GET({
    api: "/user/account/info",
    apiBase: "auth",
    type: "Public",
  })
}

export function fetchPromoters(req) {
  return POST({
    api: "/Api/promoter/list",
    apiBase: "promoter",
    data: req
  })
    .then(json => json);
}

export function updatePromoterStatus(req) {
  return POST({
    api: "/Api/promoter/modify_status",
    apiBase: "promoter",
    data: req
  })
    .then(json => json)
}

export function createPromoter(req) {
  return POST({
    api: "/Api/promoter/create",
    apiBase: "promoter",
    data: req
  })
    .then(json => json)
}

export function fetchConsumerDetail(req) {
  return GET({
    api: `/Api/consumer/details/${req.consumer_id}`,
    apiBase: "customer"
  })
    .then(json => json)
}

export function fetchStatesandCities(req) {
  return POST({
    api: "/Api/listStates",
    apiBase: "retailer",
    data: req
  })
    .then(json => json)
}

export function editPromoter(req) {
  return POST({
    api: "/Api/promoter/edit",
    apiBase: "promoter",
    data: req
  })
    .then(json => json)
}

export function fetchStoreRevenue(req) {
  return POST({
    api: `/daily_store_revenue?limit=${req.limit}&offset=${req.offset}`,
    apiBase: "bmbackend",
    data: req.body
  })
    .then(json => json)
}

export function fetchSalesAndRevenueDistr(req) {
  return POST({
    api: `/daily_sales_revenue?limit=${req.limit}&offset=${req.offset}`,
    apiBase: "bmbackend",
    data: req.body
  })
    .then(json => json)
}

export function fetchSalesInsight(req) {
  return POST({
    api: `/sales_insights`,
    apiBase: "bmbackend",
    data: req.body
  })
    .then(json => json)
}

export function fetchGenres(req) {
  return GET({
    api: "/genres",
    apiBase: "bmbackend"
  })
    .then(json => json)
}

export function fetchBrands(req) {
  return GET({
    api: `/brands/${req.genre_id}`,
    apiBase: "bmbackend"
  })
    .then(json => json)
}

export function fetchSkus(req) {
  return GET({
    api: `/skus/${req.brand_id}`,
    apiBase: "bmbackend"
  })
    .then(json => json)
}

export function fetchStates(req) {
  return GET({
    api: "/states",
    apiBase: "bmbackend"
  })
    .then(json => json)
}

export function fetchCities(req) {
  return GET({
    api: `/cities/${req.stateShortName}`,
    apiBase: "bmbackend"
  })
    .then(json => json)
}

export function fetchRetailers(req) {
  return GET({
    api: `/retailers`,
    apiBase: "bmbackend"
  })
    .then(json => json)
}