import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Activity, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");

  const clients = [
    {
      id: "c1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=10",
      program: "12-Week Strength Building",
      lastSession: "2025-10-01",
      nextSession: "2025-10-05",
      progress: 85,
      status: "active",
    },
    {
      id: "c2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=11",
      program: "Fat Loss & Conditioning",
      lastSession: "2025-09-30",
      nextSession: "2025-10-04",
      progress: 72,
      status: "active",
    },
    {
      id: "c3",
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=12",
      program: "Beginner Strength",
      lastSession: "2025-09-15",
      nextSession: null,
      progress: 45,
      status: "at_risk",
    },
    {
      id: "c4",
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=13",
      program: "Advanced Powerlifting",
      lastSession: "2025-10-02",
      nextSession: "2025-10-06",
      progress: 92,
      status: "active",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
          <p className="text-2xl font-bold">{clients.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Active Programs</p>
          <p className="text-2xl font-bold">{clients.filter((c) => c.status === "active").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">At Risk</p>
          <p className="text-2xl font-bold text-yellow-500">
            {clients.filter((c) => c.status === "at_risk").length}
          </p>
        </Card>
      </div>

      {/* Client List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{client.name}</h3>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>
                      {client.status === "at_risk" ? "At Risk" : "Active"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toast({ title: "Message Client", description: "Opening chat..." })
                      }
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toast({ title: "View Progress", description: "Loading client progress..." })
                      }
                    >
                      <Activity className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{client.program}</p>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last Session</p>
                    <p className="font-medium">{client.lastSession}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Session</p>
                    <p className="font-medium">{client.nextSession || "Not scheduled"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Progress</p>
                    <p className="font-medium">{client.progress}%</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
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
    </div>
  );
}
