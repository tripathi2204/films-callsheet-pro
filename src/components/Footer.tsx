import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://firstdraftfilmworks.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            © 2025 First Draft Filmworks
          </a>
          <span className="text-border">|</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <span className="text-border">|</span>
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
