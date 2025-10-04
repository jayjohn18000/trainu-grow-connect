import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Calendar() {
  const { user } = useAuthStore();

  const upcomingSessions = [
    {
      id: "1",
      title: "Strength Training",
      trainer: "Alex Carter",
      date: "2025-10-05",
      time: "10:00 AM",
      duration: "60 min",
      type: "in_person",
    },
    {
      id: "2",
      title: "HIIT Bootcamp",
      trainer: "Riley Nguyen",
      date: "2025-10-06",
      time: "6:00 PM",
      duration: "45 min",
      type: "in_person",
    },
    {
      id: "3",
      title: "Nutrition Consultation",
      trainer: "Riley Nguyen",
      date: "2025-10-08",
      time: "2:00 PM",
      duration: "30 min",
      type: "virtual",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            {user?.role === "client" && "View and manage your upcoming sessions"}
            {user?.role === "trainer" && "Manage your availability and sessions"}
            {user?.role === "gym_admin" && "View facility schedule and bookings"}
          </p>
        </div>
        {user?.role === "trainer" && (
          <Button
            onClick={() =>
              toast({ title: "Add Availability", description: "Opening availability editor..." })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Availability
          </Button>
        )}
      </div>

      {/* Calendar view placeholder */}
      <Card className="p-8 text-center">
        <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Calendar View Coming Soon</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Interactive calendar with booking management will be available in the next phase
        </p>
      </Card>

      {/* Upcoming Sessions */}
      {user?.role === "client" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div>
                  <p className="font-medium">{session.title}</p>
                  <p className="text-sm text-muted-foreground">
                    with {session.trainer} • {session.date} at {session.time}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.duration} • {session.type === "virtual" ? "Virtual" : "In-Person"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      toast({ title: "Reschedule", description: "Opening reschedule dialog..." })
                    }
                  >
                    Reschedule
                  </Button>
                  {session.type === "virtual" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        toast({ title: "Join Session", description: "Opening virtual session..." })
                      }
                    >
                      Join
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
