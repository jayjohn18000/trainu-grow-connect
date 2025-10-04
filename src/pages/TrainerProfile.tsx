import { useParams, Link } from "react-router-dom";
import { trainers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, CheckCircle2, Calendar, ArrowLeft, MessageSquare } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Full-Width Image */}
      <div className="relative aspect-video w-full bg-secondary overflow-hidden">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <Link to="/directory" className="absolute top-6 left-6">
          <Button variant="secondary" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 space-y-6 pb-12">
        {/* Profile Card */}
        <div className="metric-card">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-4xl font-bold text-foreground">{trainer.name}</h1>
                  {trainer.verified && (
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  )}
                </div>
                <p className="text-xl text-muted-foreground">{trainer.title}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
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

              <p className="text-muted-foreground leading-relaxed text-lg">{trainer.bio}</p>
            </div>

            <div className="lg:w-80 space-y-3">
              <Button size="lg" className="w-full gap-2 card-elevated">
                <Calendar className="h-5 w-5" />
                Book with {trainer.name.split(' ')[0]}
              </Button>
              <Button size="lg" variant="outline" className="w-full gap-2">
                <MessageSquare className="h-5 w-5" />
                Send Message
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="metric-card text-center">
            <p className="text-4xl font-bold text-primary">{trainer.clients}</p>
            <p className="text-sm text-muted-foreground mt-2">Active Clients</p>
          </div>
          <div className="metric-card text-center">
            <p className="text-4xl font-bold text-primary">{trainer.sessions}</p>
            <p className="text-sm text-muted-foreground mt-2">Sessions Completed</p>
          </div>
          <div className="metric-card text-center">
            <p className="text-4xl font-bold text-primary">{trainer.rating}</p>
            <p className="text-sm text-muted-foreground mt-2">Average Rating</p>
          </div>
        </div>

        {/* Optional Media Gallery */}
        <div className="metric-card">
          <h2 className="text-2xl font-bold mb-4">Training Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[trainer.image, trainer.image, trainer.image].map((img, idx) => (
              <div key={idx} className="aspect-video bg-secondary rounded-lg overflow-hidden">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Client Testimonials</h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Alex Johnson",
                text: "Best trainer I've ever worked with! Saw amazing results in just 3 months. Professional, knowledgeable, and truly dedicated.",
                rating: 5,
              },
              {
                name: "Jamie Smith",
                text: "Professional, knowledgeable, and really cares about helping you reach your goals. Highly recommend!",
                rating: 5,
              },
              {
                name: "Morgan Taylor",
                text: "Transformed my fitness journey completely. The personalized approach made all the difference.",
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
    </div>
  );
}
