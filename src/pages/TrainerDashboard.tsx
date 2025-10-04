import { Users, Calendar, TrendingUp, Target } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { MetricsChart } from "@/components/MetricsChart";
import { trainerKPIs } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function TrainerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your performance overview.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Clients"
          value={trainerKPIs.activeClients}
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        <KPICard
          title="Sessions This Week"
          value={trainerKPIs.sessionsThisWeek}
          icon={Calendar}
          trend={{ value: 8, positive: true }}
        />
        <KPICard
          title="Retention Rate"
          value={`${trainerKPIs.retention}%`}
          icon={TrendingUp}
          trend={{ value: 3, positive: true }}
        />
        <KPICard
          title="Avg Client Progress"
          value={`${trainerKPIs.avgProgress}%`}
          icon={Target}
          trend={{ value: 5, positive: true }}
        />
      </div>

      {/* Main Chart */}
      <MetricsChart />

      {/* Secondary Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="metric-card">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {[
              { client: "Alex Johnson", time: "Tomorrow 10:00 AM", type: "Strength Training" },
              { client: "Jamie Smith", time: "Tomorrow 2:00 PM", type: "HIIT Cardio" },
              { client: "Casey Brooks", time: "Friday 9:00 AM", type: "Olympic Lifting" },
            ].map((session, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{session.client}</p>
                  <p className="text-sm text-muted-foreground">{session.type}</p>
                </div>
                <p className="text-sm text-muted-foreground">{session.time}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Sessions
          </Button>
        </div>

        {/* Recent Client Updates */}
        <div className="metric-card">
          <h3 className="text-lg font-semibold mb-4">Recent Client Updates</h3>
          <div className="space-y-3">
            {[
              { client: "Alex Johnson", update: "Completed week 4 of program", time: "2h ago" },
              { client: "Taylor Morgan", update: "New PR: 225lb squat!", time: "5h ago" },
              { client: "Jordan Lee", update: "Check-in photo uploaded", time: "1d ago" },
            ].map((update, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{update.client}</p>
                  <p className="text-sm text-muted-foreground">{update.update}</p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">{update.time}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Updates
          </Button>
        </div>
      </div>
    </div>
  );
}
