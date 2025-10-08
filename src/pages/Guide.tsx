import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const Guide = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Call Sheet Guide</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Everything You Need to Know to Fill Out Your Film Call Sheet
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-foreground/90">
            A call sheet is the heartbeat of every shoot day — it keeps your cast, crew, and departments aligned. Below, we'll break down each section of your call sheet template and show you exactly how to fill it out.
          </p>

          <hr className="my-8 border-border" />

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Production Header</h2>
          <p className="text-foreground/90">
            At the top of your call sheet, include your <strong>Production Company Logo</strong> and <strong>Project Title</strong>.
          </p>
          <p className="text-foreground/90">
            This instantly identifies the document as official and helps everyone on set know which project and shoot day it belongs to.
          </p>
          <p className="text-sm italic text-muted-foreground">
            Tip: Always double-check that your shoot day number is correct to avoid confusion on multi-day productions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. Production Office Details</h2>
          <p className="text-foreground/90">This section includes:</p>
          <ul className="text-foreground/90">
            <li><strong>Production Office Address</strong> – where your main base of operations is located.</li>
            <li><strong>Producer and Director Contacts</strong> – phone numbers for immediate questions or emergencies.</li>
            <li><strong>Key Production Contacts</strong> – you can add the Production Manager, AD, or Unit Production Manager here.</li>
          </ul>
          <p className="text-foreground/90">
            <strong>Why it matters:</strong> Crew members often need to reach someone quickly. Having contact info front and center avoids costly delays.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. General Crew Call</h2>
          <p className="text-foreground/90">
            This indicates the main call time — when most crew members are expected on set.
          </p>
          <p className="text-foreground/90">
            Example: General Crew Call – 8:00 AM.
          </p>
          <p className="text-sm italic text-muted-foreground">
            Note: Different departments or units might have separate calls (e.g., camera prep earlier). Those can be listed individually in the notes section.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Production Notes</h2>
          <p className="text-foreground/90">Use this space for daily updates or special reminders, such as:</p>
          <ul className="text-foreground/90">
            <li>Special effects or stunts</li>
            <li>Equipment pickups or weather concerns</li>
            <li>Any changes to the shooting plan</li>
          </ul>
          <p className="text-sm italic text-muted-foreground">
            Pro tip: Keep it concise but clear — this section is your one-shot announcement board for the day.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Weather & Sunrise/Sunset</h2>
          <p className="text-foreground/90">The top-right box provides essential weather information:</p>
          <ul className="text-foreground/90">
            <li><strong>Temperature</strong> (high/low)</li>
            <li><strong>Sunrise & Sunset times</strong> – critical for planning daylight shoots.</li>
            <li><strong>Precipitation percentage</strong> – helps departments prepare for rain or reschedule exterior shots.</li>
          </ul>
          <p className="text-foreground/90">
            Crew Call on the same line confirms when everyone should be on set ready to roll.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">6. Schedule</h2>
          <p className="text-foreground/90">
            Here's where you list the scenes to be shot that day — usually referenced by scene number, description, location, and estimated duration.
          </p>
          <p className="text-foreground/90">
            Include total pages for the day so production knows the workload.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">7. Locations</h2>
          <p className="text-foreground/90">List addresses of all shooting locations for the day.</p>
          <p className="text-foreground/90">Each should include:</p>
          <ul className="text-foreground/90">
            <li>Full address</li>
            <li>Parking instructions</li>
            <li>Nearest hospital (for safety compliance)</li>
          </ul>
          <p className="text-sm italic text-muted-foreground">
            Tip: Crew members often refer to this section first when navigating between sets.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">8. Talent</h2>
          <p className="text-foreground/90">
            This section lists the cast members required for the day, along with:
          </p>
          <ul className="text-foreground/90">
            <li>Their character names</li>
            <li>Call times</li>
            <li>Other details: Makeup Start time, Contact, SWF, etc.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">9. Department Notes</h2>
          <p className="text-foreground/90">
            Each department (Camera, Sound, G&E, Wardrobe, etc.) can include specific reminders or requests here.
          </p>
          <p className="text-foreground/90">For example:</p>
          <ul className="text-foreground/90">
            <li><strong>Camera:</strong> 24mm lens prep before Scene 5</li>
            <li><strong>Wardrobe:</strong> Backup costumes ready by 11:00 AM.</li>
          </ul>
          <p className="text-foreground/90">
            This section ensures interdepartmental coordination.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">10. Advance Schedule</h2>
          <p className="text-foreground/90">
            This outlines what's coming next — a sneak peek at tomorrow's or next week's plan.
          </p>
          <p className="text-foreground/90">
            This helps departments anticipate logistics and prep early.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">11. Radio Channels</h2>
          <p className="text-foreground/90">
            Most film sets use walkie-talkies. This section lists which radio channel each department operates on, ensuring smooth communication.
          </p>
          <p className="text-foreground/90">Example:</p>
          <ul className="text-foreground/90">
            <li>Channel 1: Production</li>
            <li>Channel 2: Camera</li>
            <li>Channel 3: G&E</li>
            <li>Channel 4: Art Dept</li>
          </ul>

          <hr className="my-8 border-border" />

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">✅ Final Tip</h2>
          <p className="text-foreground/90">
            Always review your call sheet the night before sending it out. Check:
          </p>
          <ul className="text-foreground/90">
            <li>All call times are confirmed</li>
            <li>Contact numbers are correct</li>
            <li>Weather and locations are updated</li>
          </ul>
          <p className="text-foreground/90 font-semibold">
            A well-prepared call sheet keeps your shoot day running like clockwork.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guide;
