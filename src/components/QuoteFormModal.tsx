import React from 'react';
import { transformQuote } from '../utils/convert';
import { Quote } from '../utils/types';
import Button from './Button';
import Modal from './Modal';

export type Values = typeof defaultValues

type Props = {
  handleClose: () => void
  handleSubmit: (vals: Values) => Promise<any>;
  initialValues?: Quote;
};

const defaultValues = {
  lastName: '',
  firstName: '',
  age: 0,
  quote: '',
  imageUrl: '',
}


const CreateQuoteModal = ({ handleClose, handleSubmit, initialValues }: Props) => {
  const [values, setValues] = React.useState<Values>(initialValues ? transformQuote(initialValues) : defaultValues)
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = (e: React.SyntheticEvent) => {
    setError(null);
    e.preventDefault();
    handleSubmit(values)
      .then(() => handleClose())
      .catch(err => setError(err))
  }
  const getSetValue = (key: keyof typeof defaultValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({
      ...values, [key]: e.target.value
    });


  return <Modal handleClose={handleClose}>
    <form onSubmit={onSubmit} style={{ display: 'grid' }}>
      <input value={values.firstName} onChange={getSetValue('firstName')} placeholder='First Name'></input>
      <input value={values.lastName} onChange={getSetValue('lastName')} placeholder='Last Name'></input>
      <input value={values.age} onChange={getSetValue('age')} placeholder='Age'></input>
      <input value={values.quote} onChange={getSetValue('quote')} placeholder='Quote'></input>
      <input value={values.imageUrl} onChange={getSetValue('imageUrl')} placeholder='Image URL'></input>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <Button className='primary-button' type='submit' onClick={onSubmit} text='Done!' />
    </form>
  </Modal>
};


export default CreateQuoteModal