/* eslint-disable react/no-unescaped-entities */
// pages/privacy-policy.jsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-16 px-4">
      <section className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-4">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">
          Last updated: 25 May 2025
        </p>

        {/* Privacy Policy */}
        <h2 className="text-2xl font-bold text-green-600 mb-2">Privacy Policy</h2>
        <p className="mb-4">
          This privacy notice for <strong>KanBanPro</strong> ("<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>") describes how and why we might collect, store, use, and/or share ("<strong>process</strong>") your information when you use our services (&#34;<strong>Services</strong>&quot;), such as when you:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Visit our website at <strong>[Website URL]</strong></li>
          <li>Use our web or mobile applications</li>
          <li>Engage with us in other related ways, including sales, marketing, or events</li>
        </ul>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">1. What Information Do We Collect?</h3>
        <p className="mb-4">
          We collect personal information that you provide to us, such as your name, email address, phone number, organization details, and any other information you choose to provide. We may also collect information automatically, such as IP address, browser type, device information, and usage data through cookies and similar technologies.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">2. How Do We Use Your Information?</h3>
        <p className="mb-4">
          We use your information to:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Provide, operate, and maintain our Services</li>
          <li>Improve, personalize, and expand our Services</li>
          <li>Communicate with you, including for customer service and updates</li>
          <li>Send you marketing and promotional communications (with your consent)</li>
          <li>Comply with legal obligations and protect our rights</li>
        </ul>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">3. Will Your Information Be Shared?</h3>
        <p className="mb-4">
          We do not sell your personal information. We may share your information with trusted third parties who assist us in operating our Services, conducting our business, or serving our users, as long as those parties agree to keep this information confidential. We may also disclose information if required by law.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">4. Cookies and Tracking Technologies</h3>
        <p className="mb-4">
          We use cookies and similar tracking technologies to access or store information. You can control the use of cookies at the individual browser level.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">5. Data Security</h3>
        <p className="mb-4">
          We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">6. User Rights</h3>
        <p className="mb-4">
          Depending on your location, you may have rights regarding your personal data, including the right to access, correct, delete, or restrict its use. To exercise these rights, contact us at <strong>[Contact Email]</strong>.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">7. International Data Transfers</h3>
        <p className="mb-4">
          Your information may be transferred to and processed in countries other than your own. We ensure such transfers are done in compliance with applicable laws.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">8. Changes to This Privacy Policy</h3>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date and will be effective as soon as it is accessible.
        </p>

        {/* Terms of Service */}
        <h2 className="text-2xl font-bold text-green-600 mt-10 mb-2">Terms of Service</h2>
        <p className="mb-4">
          By using our Services, you agree to these Terms of Service. If you do not agree, please do not use our Services.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">1. Use of Services</h3>
        <p className="mb-4">
          You must be at least 13 years old to use our Services. You agree not to misuse our Services or help anyone else do so.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">2. Intellectual Property</h3>
        <p className="mb-4">
          All content, trademarks, and data on this website are the property of [Company Name] or its licensors and are protected by copyright and intellectual property laws.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">3. Limitation of Liability</h3>
        <p className="mb-4">
          We are not liable for any damages or losses resulting from your use of our Services, to the maximum extent permitted by law.
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">4. Governing Law</h3>
        <p className="mb-4">
          These terms shall be governed by and construed in accordance with the laws of [Your Country/State].
        </p>

        <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">5. Contact Us</h3>
        <p className="mb-4">
          If you have questions or concerns about this Privacy Policy or our Terms of Service, please contact us at <strong>[Contact Email]</strong>.
        </p>
      </section>
    </div>
  );
}
