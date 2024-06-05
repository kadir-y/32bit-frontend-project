import { http, HttpResponse, delay } from 'msw'
import products from './products.json'
import queryString from "query-string";
import url from "url";

const baseUrl = process.env.REACT_APP_API_URL;

export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  http.get(baseUrl + "/", () => {
    return new HttpResponse("ok", {
      status: 200,  
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }),
  http.get(baseUrl + "/version", () => {
    return HttpResponse.json({ version: "1.0.0" });
  }),
  http.get(baseUrl + "/store-info", () => {
    return HttpResponse.json({
      info: {
        number: "1057",
        cashRegisterIp: "10.0.2.16",
        cashRegisterNumber: "Kasa 1"
      }
    })
  }),
  http.get(baseUrl + "/product", ({ request }) => {
    const path = url.parse(request.url).path;
    console.log(path)
  }),
  http.get(baseUrl + "/products", async ({ request }) => {
    const query = url.parse(request.url).query;
    let { page, limit, search, sort, startWith } = queryString.parse(query);
    let filteredData = products;
    if (Boolean(startWith)) {
      filteredData = filteredData.filter(p => {
        const title = p.title.toLocaleLowerCase();
        const [f, s] = startWith.split("-");
        const fCharCode = f.toLocaleLowerCase().charCodeAt();
        const sCharCode = s && s.toLocaleLowerCase().charCodeAt();
        const tCharCode = title[0].toLocaleLowerCase().charCodeAt();
        return fCharCode === tCharCode || (sCharCode && (sCharCode >= tCharCode && fCharCode < tCharCode));
      });
    }
    if (Boolean(search)) {
      filteredData = filteredData.filter(p => {
        search = typeof search === "number" ? search : search.toLocaleLowerCase();
        const title = p.title.toLocaleLowerCase();
        return title.includes(search) || p.meta?.barcode.includes(search);
      });
    }
    if (sort === "expensive") {
      filteredData.sort((a, b) => a.price > b.price  ? -1 : 1);
    } else if (sort === "cheap") {
      filteredData.sort((a, b) => a.price < b.price ? -1 : 1);
    } else if (sort === "ZA") {
      filteredData.sort((a, b) => {
        const aTitle = a.title.toLocaleLowerCase();
        const bTitle = b.title.toLocaleLowerCase();

        return [aTitle, bTitle].sort()[0] === bTitle ? -1 : 1;
      })
    } else {
      filteredData.sort((a, b) => {
        const aTitle = a.title.toLocaleLowerCase();
        const bTitle = b.title.toLocaleLowerCase();

        return [aTitle, bTitle].sort()[0] === aTitle ? -1 : 1;
      })
    }
    const data = filteredData.slice((page - 1) * limit, page * limit);
    const totalCount = filteredData.length;
    const totalPage = Math.ceil(totalCount / limit);
    await delay(500);
    return HttpResponse.json({ products: data, totalPage, totalCount });
  })
]