import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={logo} alt="TheCallSheetApp.com" className="h-10 w-10" />
          <span className="font-bold text-lg bg-gradient-to-r from-[hsl(var(--brand-blue))] via-[hsl(var(--brand-purple))] to-[hsl(var(--brand-pink))] bg-clip-text text-transparent">
            TheCallSheetApp.com
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/guide">
            <Button variant="ghost" size="sm">
              Call Sheet Guide
            </Button>
          </Link>
          <Button variant="ghost" size="sm" disabled>
            Blog
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <a href="mailto:firstdraftfilmworks@gmail.com">
            <Button variant="default" size="sm">
              Get in touch
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
