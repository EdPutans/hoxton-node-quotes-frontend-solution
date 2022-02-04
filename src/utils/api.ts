
import React from "react";
import { APIQuote, FetchType } from "./types";

const API = `http://localhost:3001`;

const quotesEndpoint = `${API}/quotes`;

export const sendRequest = async (
  fetchType: FetchType = 'all',
  params?: { id?: number, body?: Record<string, unknown> },
): Promise<any> => {


  const headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const { url, method } = getEndpoint(fetchType, params || undefined);
  if (!url) throw Error("No URL was returned. You did smt wrong");

  const fetchParams: Record<string, unknown> = {
    headers,
  }

  if (params?.body)
    fetchParams.body = JSON.stringify(params.body)
  if (method)
    fetchParams.method = method

  const result = await fetch(url, fetchParams);
  const json = await result.json();

  return json;
}


function getEndpoint<F extends FetchType>(
  fetchType: F,
  params?: { id?: number }
): { url: string, method: string } {
  const singleURL = params?.id ? `${quotesEndpoint}/${params.id}` : '';

  switch (fetchType) {
    case "random":
      return { url: `${quotesEndpoint}/random`, method: "GET" };
    case "single":
      return { url: singleURL, method: "GET" };
    case "delete":
      return { url: singleURL, method: "DELETE" };
    case "update":
      return { url: singleURL, method: "PATCH" };
    case "all":
      return { url: quotesEndpoint, method: "GET" };
    case "create":
      return { url: quotesEndpoint, method: "POST" };
    default:
      return { url: '', method: '' };
  }
}

export const getFetchFunc = (fetchType: FetchType): ((...args: any) => Promise<any>) => {
  switch (fetchType) {
    case "random":
      return fetchRandom;
    case "single":
      return fetchQuote;
    case "create":
      return createQuote;
    case "update":
      return updateQuote;
    case "delete":
      return deleteQuote;
    case "all":
    default:
      return fetchAll;
  }
}

type FetchSingleParam = { id: number };
type CreateQuoteParam = { quote: APIQuote }
type UpdateQuoteParam = { id: number, body: APIQuote }
type DeleteQuoteParam = FetchSingleParam;

type UseFetchParams = undefined | FetchSingleParam | CreateQuoteParam | UpdateQuoteParam | DeleteQuoteParam

export const fetchAll = () => sendRequest('all');
export const fetchQuote = (params: FetchSingleParam) => sendRequest('single', { id: params.id });
export const fetchRandom = () => sendRequest('random');
export const createQuote = (params: CreateQuoteParam) => sendRequest('create', { body: params.quote });
export const updateQuote = (params: UpdateQuoteParam) => sendRequest('update', { id: params.id, body: params.body });
export const deleteQuote = (params: DeleteQuoteParam) => sendRequest('delete', { id: params.id });

function useFetch<T>(fetchType: FetchType, params?: UseFetchParams, preventInitialFetch?: boolean) {
  const [state, setState] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const callApi = React.useCallback(async (params2?: any) => {
    setError(null);

    const fetchFunc = getFetchFunc(fetchType);

    return fetchFunc(params || params2)
      .then(r => setState(r))
      .catch(e => setError(e));
  }, []);

  React.useEffect(() => {
    if (preventInitialFetch) return;

    callApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return { state, error, callApi };
};
export default useFetch;