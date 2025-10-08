import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const Privacy = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            This Privacy Policy applies to the website and application: <strong>Thecallsheetapp.com</strong> (the "Site" or "Service"), owned and operated by First Draft Filmworks ("First Draft Filmworks", "we", "us", or "our").
          </p>

          <p>
            This Privacy Policy describes how First Draft Filmworks collects, uses, shares, and protects personal information you provide while using our Service to create and distribute Film Call Sheets. It also outlines your rights and choices regarding the use and access of your information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Collection</h2>
          <p>We may collect the following personal information from you:</p>
          <ul>
            <li><strong>Contact Information</strong> — such as your name, email address, phone number, or production role.</li>
            <li><strong>Production Details</strong> — such as project title, company name, shoot dates, call times, and crew lists.</li>
            <li><strong>Crew & Cast Information</strong> — such as names, job titles, phone numbers, and email addresses entered by you to generate a Call Sheet.</li>
            <li><strong>Account Information</strong> — such as username, password, and profile preferences.</li>
            <li><strong>Location Information</strong> — based on IP address or entered shoot location.</li>
            <li><strong>Usage Information</strong> — including browser type, operating system, referring/exit pages, and clickstream data for analytics and service improvement.</li>
          </ul>

          <p>
            If you upload or input personal information about others (such as crew or cast), you represent that you have obtained the necessary permissions to do so. This information will only be used for the specific purpose of generating and distributing Call Sheets as requested by you.
          </p>

          <p>
            First Draft Filmworks and its partners may use cookies or similar technologies to analyze trends, manage sessions, and enhance user experience. You can control cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Information</h2>
          <p>The personal information collected is used to:</p>
          <ul>
            <li>Generate and deliver customized Film Call Sheets;</li>
            <li>Facilitate communication between production members;</li>
            <li>Improve and personalize your experience;</li>
            <li>Respond to inquiries and provide customer support;</li>
            <li>Conduct analytics and enhance the platform;</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <p className="font-semibold">
            We do not sell or rent your personal data to third parties.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. With Third Parties</h3>
          <p>
            We may share limited information with trusted third-party tools or analytics providers that help us improve our service. You can opt out of non-essential cookies on the consent screen.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. With Service Providers</h3>
          <p>We may share your information with service providers who perform functions such as:</p>
          <ul>
            <li>Hosting and cloud infrastructure;</li>
            <li>Email delivery (for sending Call Sheets or notifications);</li>
            <li>Payment processing (for paid plans, if applicable);</li>
            <li>Analytics and performance tracking.</li>
          </ul>
          <p>
            These companies are authorized to use your personal data only as necessary to provide these services to us.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. With Public Authorities or Law Enforcement</h3>
          <p>
            We may disclose information if required by law or in response to lawful requests, such as to comply with subpoenas, protect our legal rights, or ensure user safety.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">d. In the Event of a Merger or Acquisition</h3>
          <p>
            If Call Sheet Generator is involved in a merger, acquisition, or sale, you will be notified of any changes to ownership or control and the choices available to you.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Security</h2>
          <p>
            We value the security of your information. We use industry-standard security measures to protect personal data during transmission and storage.
          </p>
          <p>
            Only authorized personnel who require access to operate or improve the platform can view user information. These individuals are bound by confidentiality agreements and may face disciplinary action for violations.
          </p>
          <p>
            While we take reasonable precautions, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Retention & Access</h2>
          <p>
            We retain your data as long as your account is active or as needed to provide our services. You may access, update, or request deletion of your personal information by logging into your account or contacting us using the details below.
          </p>
          <p>
            We will respond to all requests within a reasonable timeframe unless retention is required by law or necessary to fulfill a service obligation.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Choices</h2>
          <ul>
            <li><strong>Email Communication:</strong> You may unsubscribe from marketing or update notifications at any time by using the "Unsubscribe" link in our emails or contacting us directly.</li>
            <li><strong>Cookies:</strong> You can manage cookie preferences in your browser settings.</li>
            <li><strong>Advertising:</strong> We may display general (non-targeted) ads; you can opt out of interest-based ads if applicable.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect new practices or regulatory requirements. If we make material changes, we will notify you by email (if available) or by posting a prominent notice on our website before the changes take effect.
          </p>
          <p>
            We encourage you to review this page periodically for the latest updates.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Privacy Questions / Contact</h2>
          <p>
            If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at:
          </p>
          <p className="font-semibold">
            📧 <a href="mailto:firstdraftfilmworks@gmail.com" className="text-primary hover:underline">firstdraftfilmworks@gmail.com</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
