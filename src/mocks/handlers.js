import { http, HttpResponse } from 'msw'
const baseUrl = process.env.REACT_APP_API_URL
import products from './products.json'

export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  http.get(baseUrl + "/", () => {
    return HttpResponse.status(200);
  }),
  http.get(baseUrl + "/version", () => {
    return HttpResponse.json({ version: "1.0.0" });
  }),
  http.get(baseUrl + "/products", ({request}) => {
    const page = request.url.searchParams.get("page");
    const limit = request.url.searchParams.get("limit");
    page * limit
    const data = products.slice(page * limit, page * (limit + 1));
    return HttpResponse.json({ products: data });
  })
]