import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ClientDetailModal } from "@/components/clients/ClientDetailModal";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const navigate = useNavigate();

  const clients = [
    {
      id: "c1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=10",
      program: "12-Week Strength Building",
      lastSession: "2025-10-01",
      nextSession: "2025-10-05",
      progress: 85,
      status: "active" as const,
      revenue: 1200,
    },
    {
      id: "c2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=11",
      program: "Fat Loss & Conditioning",
      lastSession: "2025-09-30",
      nextSession: "2025-10-04",
      progress: 72,
      status: "active" as const,
      revenue: 980,
    },
    {
      id: "c3",
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=12",
      program: "Beginner Strength",
      lastSession: "2025-09-15",
      nextSession: null,
      progress: 45,
      status: "at_risk" as const,
      revenue: 450,
    },
    {
      id: "c4",
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=13",
      program: "Advanced Powerlifting",
      lastSession: "2025-10-02",
      nextSession: "2025-10-06",
      progress: 92,
      status: "active" as const,
      revenue: 1500,
    },
    {
      id: "c5",
      name: "David Chen",
      avatar: "https://i.pravatar.cc/150?img=14",
      program: "Consultation Requested",
      lastSession: null,
      nextSession: "2025-10-07",
      progress: 0,
      status: "prospect" as const,
      revenue: 0,
    },
    {
      id: "c6",
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=15",
      program: "Initial Assessment Booked",
      lastSession: null,
      nextSession: "2025-10-08",
      progress: 0,
      status: "prospect" as const,
      revenue: 0,
    },
  ];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Clients</h1>
        <p className="text-muted-foreground">Manage your client roster and track their progress</p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
          <p className="text-2xl font-bold">{clients.filter((c) => c.status !== "prospect").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Active Programs</p>
          <p className="text-2xl font-bold">{clients.filter((c) => c.status === "active").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">New Prospects</p>
          <p className="text-2xl font-bold text-blue-500">
            {clients.filter((c) => c.status === "prospect").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-bold">
            ${clients.reduce((sum, c) => sum + (c.revenue || 0), 0).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Client List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card 
            key={client.id} 
            className={`p-6 transition-colors ${
              client.status === "prospect" 
                ? "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700" 
                : "bg-blue-50 dark:bg-blue-950/20"
            }`}
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{client.name}</h3>
                    <Badge 
                      variant={
                        client.status === "active" 
                          ? "default" 
                          : client.status === "prospect"
                          ? "outline"
                          : "secondary"
                      }
                      className={
                        client.status === "prospect"
                          ? "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700"
                          : ""
                      }
                    >
                      {client.status === "at_risk" 
                        ? "At Risk" 
                        : client.status === "prospect"
                        ? "New Prospect"
                        : "Active"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate("/messages")}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setSelectedClient(client)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{client.program}</p>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last Session</p>
                    <p className="font-medium">{client.lastSession || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Session</p>
                    <p className="font-medium">{client.nextSession || "Not scheduled"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      {client.status === "prospect" ? "Inquiry Date" : "Progress"}
                    </p>
                    <p className="font-medium">
                      {client.status === "prospect" ? "2025-10-03" : `${client.progress}%`}
                    </p>
                  </div>
                </div>

                {client.status !== "prospect" && (
                  <div className="mt-3">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${client.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {client.revenue > 0 && (
                  <div className="mt-3 text-sm">
                    <span className="text-muted-foreground">Lifetime Revenue: </span>
                    <span className="font-semibold">${client.revenue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No clients found</p>
        </Card>
      )}

      <ClientDetailModal
        client={selectedClient}
        open={!!selectedClient}
        onOpenChange={(open) => !open && setSelectedClient(null)}
      />
    </div>
  );
}
