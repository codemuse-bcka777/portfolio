import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ContactMessage } from '../services/contactService';
import { motion } from 'framer-motion';
import { Mail, Calendar, User } from 'lucide-react';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'contactMessages'),
      orderBy('timestamp', 'desc'),
      limit(50) // Limit to last 50 messages
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messageList: ContactMessage[] = [];
        snapshot.forEach((doc) => {
          messageList.push({
            id: doc.id,
            ...doc.data()
          } as ContactMessage);
        });
        setMessages(messageList);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages. Make sure Firebase is configured and you have read permissions.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-neon-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-red-400 font-mono text-lg mb-2">Error</h2>
          <p className="text-red-300 font-mono text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-mono text-neon-primary mb-2">Contact Messages</h1>
          <p className="text-text-primary/60 font-mono">
            Total messages: {messages.length}
          </p>
        </motion.div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-section-bg border border-neon-primary/20 rounded-lg p-8 text-center"
            >
              <Mail className="mx-auto mb-4 text-text-primary/40" size={48} />
              <p className="text-text-primary/60 font-mono">No messages yet</p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-section-bg border border-neon-primary/20 rounded-lg p-6 hover:border-neon-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-neon-secondary">
                      <User size={16} />
                      <span className="font-mono text-sm">{message.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neon-secondary">
                      <Mail size={16} />
                      <span className="font-mono text-sm">{message.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-text-primary/60">
                    <Calendar size={16} />
                    <span className="font-mono text-sm">
                      {message.timestamp?.toDate().toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="bg-dark-bg rounded-lg p-4 border border-neon-primary/10">
                  <p className="text-text-primary font-mono text-sm whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;