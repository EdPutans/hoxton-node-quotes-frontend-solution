import React from "react";
import { useNavigate } from "react-router-dom";
import { Quote as QuoteType } from "../utils/types";
import "./index.css";

type Props = {
  quote: QuoteType
}
const Quote: React.FunctionComponent<Props> = ({ quote }) => {
  const nav = useNavigate()

  return (
    <>
      <button className="quote-card" onClick={() => nav(`/quotes/${quote.id}`)}>
        <p className="quote-text">{quote.quote}</p>
      </button>
    </>
  );
};

export default Quote;
