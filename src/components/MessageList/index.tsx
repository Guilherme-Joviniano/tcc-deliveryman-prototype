import styles from './styles.module.css'

import React, { useEffect, useRef } from 'react';

export const MessageList = (props: { messages: any[] }) => {
    const { messages } = props;
    const messageListRef = useRef(null);

    useEffect(() => {
      // Mantém o scroll na parte inferior
      // @ts-ignore
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className={styles['message-list-container']}>
            <ul className={styles['message-list']} ref={messageListRef} style={{ height: '100%', overflowY: 'auto'}}>
            {messages.map((message, index) =>  {
                console.log(message.sender);
                console.log(message.sender !== 'user');    
                return (
                
                <div className={styles['message-box']} id={styles[message.sender !== 'user' ? 'received' : 'send']}>
                    <li key={index} className={styles['message-item']}>{message.content}</li>
                </div>
            )})}
            </ul>
        </div>
    );
};
