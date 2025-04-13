import useUserStore from '@/zustand';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

const ChatModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState(null);
    const userId = useUserStore((state) => state.details?.userId);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'How can I help you find the perfect gym today?'
        }
    ]);

    // Scroll to bottom of chat whenever messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Load existing chat if chatId is available
    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!chatInput.trim() || isLoading) return;
        if (!userId) {
            alert('Please login to chat with the assistant');
            return;
        }

        try {
            // Add user message to chat
            setMessages(prev => [
                ...prev,
                { type: 'user', content: chatInput }
            ]);

            // Set loading state
            setIsLoading(true);

            // Save current input and clear the input field
            const userPrompt = chatInput;
            setChatInput('');

            // Prepare the endpoint URL based on whether we're updating an existing chat
            const endpoint = chatId
                ? `https://gymlink.onrender.com/chat/${chatId}/new`
                : `https://gymlink.onrender.com/chat/new`;

            // Call API
            const res = await axios.post(
                endpoint,
                { prompt: userPrompt },
                { withCredentials: true }
            );

            // Check response
            if (res.status === 200 && res.data.success) {
                const botResponse = res.data.chat.Airesponse;

                // If this is a new chat, store the chatId for future messages
                if (!chatId && res.data.chat.id) {
                    setChatId(res.data.chat.id);
                }

                // Add bot response to chat
                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: botResponse }
                ]);
            }
        } catch (error) {
            console.error('Chat submission error:', error);

            // Add error message to chat
            setMessages(prev => [
                ...prev,
                { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Chat icon button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-lime-400 hover:bg-lime-500 text-black p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                    aria-label="Open chat assistant"
                >
                    <FiMessageSquare size={24} className="cursor-pointer" />
                </button>
            </div>

            {/* Chat modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col" style={{ maxHeight: '80vh' }}>
                        {/* Modal Header */}
                        <div className="bg-lime-400 px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <FiMessageSquare size={20} />
                                <h3 className="font-bold text-black">GymLinkBot Assistant</h3>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-black hover:text-gray-800"
                                aria-label="Close chat"
                            >
                                <FiX size={20} className="cursor-pointer" />
                            </button>
                        </div>

                        {/* Chat messages */}
                        <div className="p-4 bg-gray-50 flex-1 overflow-y-auto">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                                >
                                    <div
                                        className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${message.type === 'user'
                                            ? 'bg-lime-400 text-black'
                                            : 'bg-gray-200 text-gray-800'
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="text-left mb-3">
                                    <div className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                                        <span className="flex items-center">
                                            <span className="mr-2">Thinking</span>
                                            <span className="flex space-x-1">
                                                <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <form className="p-4 border-t" onSubmit={handleChatSubmit}>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Ask about gym recommendations..."
                                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className={`${isLoading || !chatInput.trim() ? 'bg-gray-400' : 'bg-lime-400 hover:bg-lime-500'
                                        } text-black px-4 py-2 rounded-r-lg flex items-center justify-center`}
                                    disabled={isLoading || !chatInput.trim()}
                                >
                                    <FiSend size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatModal;