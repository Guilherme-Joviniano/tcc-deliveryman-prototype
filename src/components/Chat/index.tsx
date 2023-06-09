import styles from './styles.module.css';

import React, { useEffect, useState } from 'react';
import { MessageList } from '../MessageList';
import { MessageInput } from '../MessageInput';
import { socket } from '../../services/api/websocket';

import { ChatService } from '../../services/api/fetchs/chat';

const popupVariants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0 },
};

interface IMessage {
  content: string;
  senders: string
}

export const Chat = (args: { from: number, _to: { name: string, id: number, photo: string } }) => {
  const { from, _to } = args;
  const chatService = new ChatService();

  const [messages, setMessages] = useState<IMessage | any>();


  const [to, setTo] = useState(_to);

  // @ts-ignore
  const [user, _] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetch = async () => {
      const res = await chatService.index(from, to.id);
      setMessages(res);
    };
    fetch().then();
  }, []);

  const addMessage = (content: string) => {
    sendMessageIOSocket({
      content,
      timestamp: new Date().toISOString(),
      fromName: user.name,
      from: user.id,
      to: to.id,
      toName: to.name,
    });

    setMessages([...messages, { content, sender: 'user' }]);
  };

  useEffect(() => {
    socket.on('chat_message', async (data) => {
      const { content } = data;
      setMessages([...messages, { content, sender: to.name }]);
    });
    return () => {
      socket.off('chat_message');
    };
  }, [messages, to.name]);

  const sendMessageIOSocket = (props: {
    content: string,
    from: number,
    to: number,
    timestamp: string,
    fromName: string,
    toName: string,
  }) => {
    socket.emit('send_message', props);
  };

  return (
    <div
      className={styles['chat-page-content']}
    >
      <div className={styles['delivery-man-info']}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            className={styles['chat-user-image']}
            style={{
              backgroundImage: `url('${to.photo}')`,
            }}
          ></div>
          <h1
            style={{
              fontSize: '1.2rem',
              height: '20px',
            }}
          >
            {to.name}
          </h1>
        </div>
      </div>
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default Chat;
