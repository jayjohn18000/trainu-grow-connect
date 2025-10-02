import { useState } from "react";
import { Link } from "react-router-dom";
import { trainers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, CheckCircle2, Search } from "lucide-react";

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      trainer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Trainer Directory</h1>
        <p className="text-muted-foreground mt-1">
          Find your perfect trainer and start your fitness journey.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, specialty, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Trainer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div key={trainer.id} className="metric-card hover:card-elevated transition-all">
            <div className="aspect-video bg-secondary rounded-lg mb-4 overflow-hidden">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">{trainer.name}</h3>
                  {trainer.verified && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{trainer.title}</p>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{trainer.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-medium">{trainer.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({trainer.clients} clients)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {trainer.specialties.slice(0, 3).map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <Link to={`/trainers/${trainer.slug}`}>
                <Button className="w-full">View Profile</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
