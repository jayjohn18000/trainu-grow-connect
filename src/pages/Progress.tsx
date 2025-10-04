import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Camera, TrendingUp, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Progress() {
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

  const mockWeightData = [
    { date: "Week 1", weight: 180 },
    { date: "Week 2", weight: 178 },
    { date: "Week 3", weight: 177 },
    { date: "Week 4", weight: 175 },
    { date: "Week 5", weight: 174 },
    { date: "Week 6", weight: 173 },
  ];

  const recentLogs = [
    { date: "2025-10-01", weight: 173, notes: "Feeling strong this week!" },
    { date: "2025-09-24", weight: 174, notes: "Completed all workouts" },
    { date: "2025-09-17", weight: 175, notes: "Added 5lbs to bench press" },
  ];

  const handleLogProgress = () => {
    if (!weight) {
      toast({ title: "Error", description: "Please enter your weight", variant: "destructive" });
      return;
    }
    toast({
      title: "Progress Logged",
      description: "Your progress has been saved successfully",
    });
    setWeight("");
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Progress Tracking</h1>
        <p className="text-muted-foreground">Log your metrics and visualize your journey</p>
      </div>

      {/* Log New Entry */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Log New Entry</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="173"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="How are you feeling? Any achievements?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleLogProgress}>Log Progress</Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({ title: "Upload Photo", description: "Photo upload dialog opening..." })
              }
            >
              <Camera className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </div>
      </Card>

      {/* Weight Trend */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weight Trend</h3>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">-7 lbs</span>
            <span className="text-muted-foreground">Last 6 weeks</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockWeightData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[170, 185]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Logs */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Logs</h3>
        <div className="space-y-3">
          {recentLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{log.date}</span>
                  <span className="text-sm text-muted-foreground">{log.weight} lbs</span>
                </div>
                <p className="text-sm text-muted-foreground">{log.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Photo Gallery Placeholder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Progress Photos</h3>
        <div className="text-center py-8">
          <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-4">No progress photos yet</p>
          <Button
            variant="outline"
            onClick={() =>
              toast({ title: "Upload Photo", description: "Photo upload dialog opening..." })
            }
          >
            <Camera className="h-4 w-4 mr-2" />
            Upload Your First Photo
          </Button>
        </div>
      </Card>
    </div>
  );
}
