// ES Modules syntax
import Unsplash, { toJson } from "unsplash-js";

const api: API = {
  key: process.env.REACT_APP_UNSPLASH_KEY || "",
  baseUrl: "",
};

const unsplash: Unsplash = new Unsplash({ accessKey: api.key });

type Search = (query: string) => Promise<string>;

const search: Search = (query) =>
  unsplash.search
    .photos(query, 1, 1, { orientation: "landscape" })
    .then(toJson)
    .then((json) => {
      console.log(json);
      return json.results[0].urls.raw;
    })
    .catch(() => "");

export default search;
