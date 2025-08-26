import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Sou o assistente virtual da MXS Soluções. Como posso te ajudar hoje?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const botResponses = [
    "Posso te ajudar a encontrar fornecedores qualificados para seu projeto!",
    "Temos mais de 500+ fornecedores verificados em nossa plataforma.",
    "Que tipo de serviço você está procurando? Construção, TI, Marketing?",
    "Posso te explicar nossos planos e como funciona nossa plataforma.",
    "Entre em contato conosco pelo WhatsApp (11) 99999-9999 para um atendimento personalizado!",
    "Você gostaria de se cadastrar para ter acesso aos nossos fornecedores?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simular resposta do bot após 1 segundo
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Texto convite acima do botão */}
      {!isOpen && (
        <div className="fixed bottom-24 right-4 z-50 max-w-64">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-3 animate-bounce">
            <p className="text-sm text-gray-700 font-medium text-center">
              💬 Converse com a <span className="text-blue-600 font-bold">IA MXS</span>
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Tire suas dúvidas instantaneamente!
            </p>
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
            size="icon"
          >
            <MessageCircle className="h-8 w-8 text-white" />
          </Button>
        )}
      </div>

      {/* Janela do chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96">
          <Card className="w-full h-full shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">Assistente MXS</CardTitle>
                    <p className="text-xs opacity-90">Online agora</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Área de mensagens */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-64">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                        )}
                        {message.sender === 'user' && (
                          <User className="h-4 w-4 mt-0.5 text-white" />
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Área de input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 border-gray-300 focus:border-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 px-3"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by MXS Soluções
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
