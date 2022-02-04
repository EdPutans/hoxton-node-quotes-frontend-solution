export type Quote = {
  quote: string;
  id: number;
  person: {
    first_name: string;
    last_name: string;
    image_url: string;
    age: number;
  };
};

export type ConvertedQuote = {
  quote: string;
  id?: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  age: number;
}

export type FetchType = "random" | "all" | "single" | "create" | "delete" | "update";

export type APIQuote = {
  first_name: string;
  last_name: string;
  image_url: string;
  age: number;
  quote: string;
  id?: number;
}