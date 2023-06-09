import styles from './styles.module.css';

import { useState } from 'react';

export const MessageInput = (props: { addMessage: (value: string) => any }) => {
  const { addMessage } = props
  const [text, setText] = useState('');

  const handleInputChange = (e: any) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    if (text.trim() !== '') {
      addMessage(text);
      setText('');
    }
  };

  return (
    // @ts-ignore
    <form onSubmit={handleFormSubmit} className={styles['message-input-container']}>
      <input type="text" value={text} onChange={handleInputChange} className={styles['message-input']} placeholder='digite sua mensagem...'/>
      <button type="submit" className={styles['message-button']}></button>
    </form>
  );
};
