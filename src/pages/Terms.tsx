import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const Terms = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>

        <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            Please read this agreement carefully before using this service. By using the service or clicking "agree," the user ("Customer") agrees to be bound by this agreement. If Customer is agreeing on behalf of or for the benefit of their employer or production company, Customer represents and warrants that they have the necessary authority to agree on their behalf.
          </p>

          <p>
            This agreement is between First Draft Filmworks ("Call Sheet Generator," "we," "us," or "our") and the Customer agreeing to these terms ("Customer").
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Software-as-a-Service</h2>
          <p>
            This agreement provides Customer access to and usage of our internet-based software platform as specified on our website — Thecallsheetapp.com (the "Service") — which allows users to create, customize, and distribute film and TV production Call Sheets and related production documents.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Service</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. Customer-Owned Data</h3>
          <p>
            All data, project names, logos, and contact details uploaded by the Customer remain the property of the Customer ("Customer Data"). Customer grants Call Sheet Generator the limited right to use, display, and process Customer Data solely for purposes of operating and improving the Service.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Team Access and Usage</h3>
          <p>
            Customer may allow production team members (such as assistant directors, producers, or coordinators) to access the Service, provided they comply with this agreement. Customer is responsible for all activity under its account, including actions by team members.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Customer Responsibilities</h3>
          <p>Customer agrees to:</p>
          <ul>
            <li>keep login credentials secure and confidential;</li>
            <li>ensure accuracy of data entered in the platform;</li>
            <li>promptly notify us of any unauthorized account access; and</li>
            <li>use the Service only for lawful film, TV, or media production-related purposes and in accordance with this agreement.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">d. Trial Period</h3>
          <p>
            If Customer registers for a free or trial use of the Service, access will be granted for a limited period (e.g., 30 days). During this period, the Service is provided "AS IS", with no warranty. Data from trial accounts may be deleted after expiration unless the Customer upgrades to a paid plan.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
          <p>
            First Draft Filmworks DISCLAIMS ALL WARRANTIES, including but not limited to implied warranties of merchantability, title, and fitness for a particular purpose. While Call Sheet Generator takes reasonable measures to secure data and maintain uptime, we do not guarantee that the Service will be error-free, uninterrupted, or immune from unauthorized access or technical issues.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Payment</h2>
          <p>
            Customer must pay all applicable subscription or service fees as specified on the website or order form. All payments are due within the timeframe stated in the invoice or checkout process. Customer is responsible for all applicable taxes (sales, VAT, withholding, etc.). Non-payment may result in suspension or termination of access to the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Confidentiality and Data Protection</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. Definition</h3>
          <p>
            "Confidential Information" means any non-public information shared by either party, including production data, call sheet content, or platform technology.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Protection</h3>
          <p>
            Each party will protect the other's Confidential Information with reasonable care and restrict access only to authorized personnel who require it for legitimate purposes.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Exclusions</h3>
          <p>Confidential Information does not include information that:</p>
          <ul>
            <li>becomes public through no fault of the recipient;</li>
            <li>was lawfully known before disclosure;</li>
            <li>is received lawfully from a third party; or</li>
            <li>is independently developed without use of the other party's Confidential Information.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Proprietary Rights</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. Reservation of Rights</h3>
          <p>
            The Service, including its software, interface, design, and processes, is proprietary to Call Sheet Generator and its licensors. All intellectual property rights remain exclusively with Call Sheet Generator. Customer may not copy, modify, or reproduce any portion of the Service.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Restrictions</h3>
          <p>Customer agrees not to:</p>
          <ul>
            <li>sell, sublicense, or resell the Service;</li>
            <li>use it to distribute spam, illegal, or infringing content;</li>
            <li>attempt to reverse engineer, hack, or copy the Service;</li>
            <li>interfere with performance or availability; or</li>
            <li>use the Service to create a competing product.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Aggregate Data</h3>
          <p>
            Call Sheet Generator may use anonymized, non-identifiable usage data to improve the Service and generate insights about platform performance and reliability.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Term and Termination</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. Term</h3>
          <p>
            This agreement remains in effect while the Customer uses the Service or maintains an active account.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Termination for Breach</h3>
          <p>
            Either party may terminate this agreement with 14 days' written notice if the other fails to remedy a material breach.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Suspension for Non-Payment or Violation</h3>
          <p>
            Call Sheet Generator may suspend or terminate access if payments are overdue or if the Customer violates laws or this agreement.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">d. Data Retention</h3>
          <p>
            Upon termination, Customer data will remain accessible for 90 days. After that period, all data may be permanently deleted.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">e. Return of Property</h3>
          <p>
            Upon request, Customer must delete or return any confidential materials belonging to Call Sheet Generator and confirm compliance in writing.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. No Indirect Damages</h3>
          <p>
            To the fullest extent permitted by law, Call Sheet Generator is not liable for any indirect, incidental, special, or consequential damages — including data loss, downtime, or lost profits — arising from use of the Service.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Maximum Liability</h3>
          <p>
            Our total liability for any claim related to this agreement will not exceed the amount paid by the Customer in the six months prior to the event giving rise to the claim.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Indemnification</h2>
          <p>
            Customer agrees to indemnify and hold harmless Call Sheet Generator from any claim, loss, or expense (including reasonable legal fees) arising from Customer's data, actions, or misuse of the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Governing Law and Jurisdiction</h2>
          <p>
            This agreement will be governed by the laws of India, without regard to conflict of laws principles. Any dispute will be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. General Terms</h2>
          <ul>
            <li><strong>Entire Agreement:</strong> This agreement constitutes the entire understanding between the parties and supersedes prior discussions.</li>
            <li><strong>Assignment:</strong> Neither party may assign this agreement without written consent, except in the case of a merger or sale of assets.</li>
            <li><strong>Independent Contractors:</strong> Both parties act as independent contractors.</li>
            <li><strong>Force Majeure:</strong> Neither party is liable for events beyond reasonable control (natural disasters, internet outages, war, etc.).</li>
            <li><strong>Equitable Relief:</strong> Breach of intellectual property rights may entitle either party to seek injunctive relief.</li>
            <li><strong>Feedback:</strong> By submitting ideas or feedback, Customer grants Call Sheet Generator a royalty-free license to use them for product improvement.</li>
            <li><strong>Survival:</strong> Sections related to confidentiality, limitation of liability, and governing law survive termination.</li>
          </ul>

          <p className="mt-8 font-semibold">
            ✅ Effective Date: These Terms of Service take effect upon your first use of the Call Sheet Generator platform.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
