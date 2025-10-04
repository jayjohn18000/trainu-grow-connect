import { communityMembers } from "@/lib/data";
import { Users as UsersIcon } from "lucide-react";

export default function CommunityPeople() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Community Members</h1>
        <p className="text-muted-foreground mt-1">
          Connect with fellow members and training partners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communityMembers.map((member) => (
          <div
            key={member.id}
            className="metric-card flex items-center gap-4 hover:card-elevated transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.gym}</p>
              <p className="text-xs text-muted-foreground">{member.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
