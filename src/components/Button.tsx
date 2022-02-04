import { HTMLProps } from 'react';

type Props = HTMLProps<HTMLButtonElement> & {
  text: string
}


const Button = (props: Props) => {
  // never do dis. 
  // @ts-ignore
  return <button {...props} className=' primary-button'>{props.text}</button>;
};

export default Button;
