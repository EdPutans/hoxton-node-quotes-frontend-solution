import { APIQuote, ConvertedQuote, Quote } from "./types";

export type PartialQuote = Quote | Omit<Quote, 'id'>

export const transformQuote = (quoteArg: Quote): ConvertedQuote => {
  const { quote, id, person: { first_name, last_name, image_url, age } } = quoteArg;

  return {
    id,
    quote,
    firstName: first_name,
    lastName: last_name,
    imageUrl: image_url,
    age
  }
}


export const quoteToApiQuote = (quoteArg: ConvertedQuote): APIQuote => {
  return {
    id: quoteArg.id || undefined,
    first_name: quoteArg.firstName,
    last_name: quoteArg.lastName,
    image_url: quoteArg.imageUrl,
    age: quoteArg.age,
    quote: quoteArg.quote,
  }
}