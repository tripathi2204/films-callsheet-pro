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
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={logo} alt="TheCallSheetApp.com" className="h-16" />
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/guide">
            <Button variant="ghost" size="sm">
              Call Sheet Guide
            </Button>
          </Link>
          <a href="https://thecallsheetapp.com/blog/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              Blog
            </Button>
          </a>
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
