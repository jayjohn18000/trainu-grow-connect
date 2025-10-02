import { useParams } from "react-router-dom";
import { trainers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, CheckCircle2, Calendar } from "lucide-react";

export default function TrainerProfile() {
  const { slug } = useParams();
  const trainer = trainers.find((t) => t.slug === slug);

  if (!trainer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Trainer not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="metric-card">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{trainer.name}</h1>
                {trainer.verified && (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                )}
              </div>
              <p className="text-xl text-muted-foreground">{trainer.title}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{trainer.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{trainer.rating}</span>
                <span className="text-muted-foreground">({trainer.clients} clients)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {trainer.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-sm">
                  {specialty}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">{trainer.bio}</p>

            <Button size="lg" className="gap-2 card-elevated">
              <Calendar className="h-5 w-5" />
              Book a Session
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card text-center">
          <p className="text-3xl font-bold text-foreground">{trainer.clients}</p>
          <p className="text-sm text-muted-foreground mt-1">Active Clients</p>
        </div>
        <div className="metric-card text-center">
          <p className="text-3xl font-bold text-foreground">{trainer.sessions}</p>
          <p className="text-sm text-muted-foreground mt-1">Sessions Completed</p>
        </div>
        <div className="metric-card text-center">
          <p className="text-3xl font-bold text-foreground">{trainer.rating}</p>
          <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="metric-card">
        <h2 className="text-2xl font-bold mb-4">Client Testimonials</h2>
        <div className="space-y-4">
          {[
            {
              name: "Alex Johnson",
              text: "Best trainer I've ever worked with! Saw amazing results in just 3 months.",
              rating: 5,
            },
            {
              name: "Jamie Smith",
              text: "Professional, knowledgeable, and really cares about helping you reach your goals.",
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-foreground mb-2">{testimonial.text}</p>
              <p className="text-sm text-muted-foreground">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
