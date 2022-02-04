import useFetch, { deleteQuote, updateQuote } from "../utils/api";
import React from "react";
import { Quote as QuoteType } from "../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import QuoteFormModal, { Values } from "./QuoteFormModal";
import { quoteToApiQuote } from "../utils/convert";
import '../components/index.css';

type Props = {
  type: "random" | "single"
  match?: any
}

const QuotePage: React.FunctionComponent<Props> = ({ type }) => {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const isRandomQuote = type === "random";

  const { quoteId } = useParams()
  const navigate = useNavigate()
  const params = isRandomQuote ? undefined : { id: Number(quoteId) }

  const { state: quote, callApi: fetchQuote } = useFetch<QuoteType>(type, params);


  const buttonProps = isRandomQuote ? {
    text: "Get another random quote",
    onClick: fetchQuote
  } : {
    text: "Go back",
    onClick: () => navigate('/')
  }

  if (!quote) return null;

  const handleUpdate = async (vals: Values) => {
    await updateQuote({ id: quote.id, body: quoteToApiQuote(vals) })
    fetchQuote(quote.id)
    setEditModalOpen(false)
  }

  const handleDelete = async () => {
    await deleteQuote({ id: quote.id })
    navigate('/')
  }

  return (
    <div className="quote-container">
      <div className='quote-actions'>
        <Button text="Edit ⚙" onClick={() => setEditModalOpen(true)} />
        <Button text="❌" onClick={handleDelete} />
      </div>
      <img alt="quotee" className="quote-photo" src={quote.person.image_url} />
      <div>
        <p className="quote-text">{quote.quote}</p>
        <p className="quote-person">
          -{quote.person.first_name} <b>{quote.person.last_name}</b>, {quote.person.age}
        </p>
      </div>
      <Button {...buttonProps} />
      {editModalOpen &&
        <QuoteFormModal
          initialValues={quote}
          handleSubmit={handleUpdate}
          handleClose={() => setEditModalOpen(false)}
        />}
    </div>
  );
};

export default QuotePage;


