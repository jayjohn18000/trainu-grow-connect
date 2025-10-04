import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listTrainers, type Trainer } from "@/lib/mock/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Discover() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    setLoading(true);
    const data = await listTrainers();
    setTrainers(data);
    setLoading(false);
  };

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      trainer.bio?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = !cityFilter || trainer.city.toLowerCase().includes(cityFilter.toLowerCase());

    return matchesSearch && matchesCity;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Discover Trainers</h1>
        <p className="text-muted-foreground">Find the perfect trainer for your fitness goals</p>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialty..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Input
            placeholder="Filter by city..."
            className="md:w-48"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
          <Button variant="outline" onClick={() => { setSearchQuery(""); setCityFilter(""); }}>
            Clear
          </Button>
        </div>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? "s" : ""}
      </div>

      {/* Trainers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
            <Card key={trainer.id} className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={trainer.avatarUrl} alt={trainer.name} />
                  <AvatarFallback>{trainer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{trainer.name}</h3>
                    {trainer.verified && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {trainer.city}, {trainer.state}
                  </div>
                  {trainer.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">{trainer.rating}</span>
                      <span className="text-muted-foreground">({trainer.reviewCount})</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {trainer.specialties.slice(0, 3).map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              {trainer.bio && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trainer.bio}</p>
              )}

              <Button className="w-full" onClick={() => navigate(`/trainers/${trainer.slug}`)}>
                View Profile
              </Button>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredTrainers.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No trainers found matching your criteria</p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setCityFilter(""); }}>
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
}
