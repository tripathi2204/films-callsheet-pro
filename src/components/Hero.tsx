import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToGenerator = () => {
    document.getElementById('call-sheet-generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Free Call Sheet Template
        </h1>
        <p className="text-2xl md:text-3xl mb-8 text-muted-foreground font-medium">
          Create professional Film Call Sheets in seconds!
        </p>
        <div className="prose prose-lg mx-auto text-left mb-10 text-foreground/90">
          <p>
            Welcome to the original Call Sheet Generator, designed for filmmakers, producers, and ADs who need to move fast. Our intuitive tool lets you instantly create beautiful, production-ready Call Sheets right from your browser.
          </p>
          <p>
            Customize every detail and download your Call Sheet as a PDF or share it instantly with your team.
          </p>
          <p className="font-semibold">
            Did we mention? You can generate unlimited Call Sheets for all your projects — completely free!
          </p>
        </div>
        <Button 
          size="lg" 
          onClick={scrollToGenerator}
          className="gap-2"
        >
          Start Creating
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
