import {
  DEFAULT_SEARCH_PARAMS_OPTIONS,
  PARAMS,
  SearchParamsOptionsT,
} from "@/src/config/params.config";
import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const productSearchParams = (options?: SearchParamsOptionsT) => {
  const newOptions = { ...DEFAULT_SEARCH_PARAMS_OPTIONS, ...options };

  return {
    [PARAMS.query]: parseAsString.withDefault("").withOptions(newOptions),
    [PARAMS.category]: parseAsString.withDefault("").withOptions(newOptions),
  };
};

export const productSearchParmsCache = createSearchParamsCache(
  productSearchParams()
);
