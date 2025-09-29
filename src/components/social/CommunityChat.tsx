import { useState, useEffect, useRef } from 'react';
import { Send, Fish, Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authService } from '@/services/auth';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface CommunityMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  imageUrl?: string;
  timestamp: string;
}

export const CommunityChat = () => {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(authService.getState().user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeAuth = authService.subscribe((state) => {
      setCurrentUser(state.user);
    });

    initializeCommunityMessages();

    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeCommunityMessages = () => {
    const fishImages = [
      '/fish/tuna.jpg',
      '/fish/kingfish.jpg',
      '/fish/pomfret.jpg',
      '/fish/mackerel.jpg',
      '/fish/sardine.jpg',
      '/fish/seabass.jpg'
    ];

    const sampleMessages: CommunityMessage[] = [
      {
        id: 'cm1',
        senderId: 'user1',
        senderName: 'Rajesh Kumar',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
        text: 'Good morning fishermen! Just caught some beautiful Kingfish today at Marina Beach! 🎣',
        imageUrl: fishImages[1],
        timestamp: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'cm2',
        senderId: 'user2',
        senderName: 'Priya Sharma',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
        text: 'Wow! That\'s a great catch! What time were you there?',
        timestamp: new Date(Date.now() - 6800000).toISOString()
      },
      {
        id: 'cm3',
        senderId: 'user1',
        senderName: 'Rajesh Kumar',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
        text: 'Early morning around 5 AM. The tide was perfect!',
        timestamp: new Date(Date.now() - 6400000).toISOString()
      },
      {
        id: 'cm4',
        senderId: 'user3',
        senderName: 'Arjun Patel',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
        text: 'Anyone tried the new spot near Besant Nagar? Heard there are good Pomfrets there.',
        imageUrl: fishImages[2],
        timestamp: new Date(Date.now() - 5400000).toISOString()
      },
      {
        id: 'cm5',
        senderId: 'user4',
        senderName: 'Lakshmi Reddy',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi',
        text: 'Yes! I was there yesterday. Caught 5 Pomfrets! The AI identified them with 92% confidence 🐟',
        timestamp: new Date(Date.now() - 4800000).toISOString()
      },
      {
        id: 'cm6',
        senderId: 'user5',
        senderName: 'Vijay Kumar',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vijay',
        text: 'Check out these Mackerels from Kovalam! Fresh catch of the day! 🎣✨',
        imageUrl: fishImages[3],
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'cm7',
        senderId: 'user2',
        senderName: 'Priya Sharma',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
        text: 'Beautiful! The health score on those must be amazing!',
        timestamp: new Date(Date.now() - 2400000).toISOString()
      },
      {
        id: 'cm8',
        senderId: 'user6',
        senderName: 'Suresh Babu',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh',
        text: 'Weather is looking good for this weekend. Planning to go to Mahabalipuram. Anyone interested?',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'cm9',
        senderId: 'user7',
        senderName: 'Meera Singh',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera',
        text: 'I\'m in! What time are we planning to leave?',
        timestamp: new Date(Date.now() - 1200000).toISOString()
      },
      {
        id: 'cm10',
        senderId: 'user8',
        senderName: 'Karthik Raj',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karthik',
        text: 'Just used the app to identify this Sea Bass! Amazing AI technology! 🤖',
        imageUrl: fishImages[5],
        timestamp: new Date(Date.now() - 600000).toISOString()
      }
    ];

    setMessages(sampleMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;

    const newMsg: CommunityMessage = {
      id: `cm_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar || '',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)]">
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
          <Fish className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">FishermanIndia</h3>
          <p className="text-xs text-muted-foreground">Community chat for all fishermen</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.senderId === currentUser?.id;
            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  isOwn ? "justify-end" : "justify-start"
                )}
              >
                {!isOwn && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                    <AvatarFallback className="text-xs">
                      {message.senderName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  "max-w-[75%] space-y-1",
                  isOwn && "items-end"
                )}>
                  {!isOwn && (
                    <p className="text-xs font-medium text-muted-foreground ml-1">{message.senderName}</p>
                  )}
                  {message.imageUrl && (
                    <img 
                      src={message.imageUrl} 
                      alt="Fish" 
                      className="rounded-lg max-w-xs w-full object-cover border border-border"
                    />
                  )}
                  <div className={cn(
                    "rounded-2xl px-4 py-2",
                    isOwn 
                      ? "bg-gradient-primary text-white" 
                      : "bg-muted text-foreground"
                  )}>
                    <p className="text-sm">{message.text}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      isOwn ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message... (images not allowed)"
            className="flex-1"
          />
          <Button 
            variant="ghost" 
            size="icon"
            disabled
            className="opacity-50"
            title="Image sharing not available in community chat"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-primary hover:opacity-90 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
