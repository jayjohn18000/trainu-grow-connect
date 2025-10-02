import { useState } from "react";
import { conversations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Send } from "lucide-react";

export default function Messages() {
  const [selectedConv, setSelectedConv] = useState(conversations[0].id);
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Stay connected with your clients and trainers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversation List */}
        <div className="metric-card overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Conversations</h3>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedConv === conv.id
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-foreground">{conv.name}</p>
                  {conv.unread && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {conv.lastMessage}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2 metric-card flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h3 className="text-lg font-semibold">
              {conversations.find((c) => c.id === selectedConv)?.name}
            </h3>
            <Button size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Book Session
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-4 space-y-4">
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                <p className="text-sm">Hey! Ready for tomorrow's session?</p>
                <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary/10 rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                <p className="text-sm">Absolutely! Looking forward to it.</p>
                <p className="text-xs text-muted-foreground mt-1">10:32 AM</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                <p className="text-sm">
                  Great! We'll focus on form for squats tomorrow.
                </p>
                <p className="text-xs text-muted-foreground mt-1">10:35 AM</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setMessage("");
                  }
                }}
              />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
