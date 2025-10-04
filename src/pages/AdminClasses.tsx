import { Calendar, Plus, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const classes = [
  {
    id: "class1",
    name: "Morning HIIT",
    trainer: "Marcus Rodriguez",
    schedule: "Mon, Wed, Fri - 6:00 AM",
    capacity: 15,
    enrolled: 12,
    status: "active",
  },
  {
    id: "class2",
    name: "Yoga Flow",
    trainer: "Emily Williams",
    schedule: "Tue, Thu - 7:00 PM",
    capacity: 20,
    enrolled: 18,
    status: "active",
  },
  {
    id: "class3",
    name: "Strength Fundamentals",
    trainer: "Sarah Chen",
    schedule: "Sat - 10:00 AM",
    capacity: 12,
    enrolled: 10,
    status: "active",
  },
  {
    id: "class4",
    name: "Boxing Basics",
    trainer: "James Taylor",
    schedule: "Mon, Wed - 5:30 PM",
    capacity: 10,
    enrolled: 8,
    status: "active",
  },
];

export default function AdminClasses() {
  const handleCreateClass = () => {
    toast({ title: "Create Class", description: "Class creation modal coming soon!" });
  };

  const handleEditClass = (className: string) => {
    toast({ title: "Edit Class", description: `Editing ${className}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground mt-1">
            Manage group fitness classes and schedules
          </p>
        </div>
        <Button onClick={handleCreateClass} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{cls.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cls.trainer}
                  </p>
                </div>
                <Badge variant={cls.status === "active" ? "default" : "secondary"}>
                  {cls.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{cls.schedule}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span className="text-foreground font-medium">
                  {cls.enrolled}/{cls.capacity} enrolled
                </span>
                <div className="flex-1 bg-secondary rounded-full h-2 ml-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleEditClass(cls.name)}
              >
                Manage Class
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
