import useFetch, { createQuote } from "../utils/api";
import Quote from "../components/Quote";
import React from "react";
import CreateQuoteModal, { Values } from "../components/QuoteFormModal";
import { Quote as QuoteType } from "../utils/types";
import Button from "../components/Button";
import { quoteToApiQuote } from "../utils/convert";

const QuotesPage: React.FunctionComponent<{ type: "all" }> = ({
  type
}) => {
  const { state, callApi } = useFetch<QuoteType[]>(type);
  const [showNewQuoteModal, setShowNewQuoteModal] = React.useState(false);

  if (!state) return null;

  const handleCreate = async (vals: Values) => {
    await createQuote({ quote: quoteToApiQuote(vals) })
      .then(() => callApi())
  }

  return (
    <>
      <div className='quotes-container'>
        {state.map(quote => <Quote
          key={quote.id}
          quote={quote}
        />)}
      </div>
      <Button text='Add a quote' onClick={() => setShowNewQuoteModal(true)} />
      {showNewQuoteModal && <CreateQuoteModal handleSubmit={handleCreate} handleClose={() => setShowNewQuoteModal(false)} />}
    </>
  );
};

export default QuotesPage;
