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

  const [messages, setMessages] = useState<IMessage | any[]>([]);


  const [to, setTo] = useState(_to);

  // @ts-ignore
  const [user, _] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetch = async () => {
      const { data } = await chatService.index(from, to.id);
      setMessages(data);
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
      console.log(data);
      
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
    console.log(props);
    
    socket.emit('send_message', props);
  };

  return (
    <div
      className={styles['chat-page-content']}
    >
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default Chat;
