
import React from 'react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-gray-600">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">About Chronos</h1>
    <div className="prose prose-lg max-w-none text-gray-600">
      <p className="mb-6">
        Founded in 2024, Chronos Smartwear emerged from a simple idea: technology should look as good as it performs. We are a team of engineers, designers, and watch enthusiasts dedicated to bridging the gap between traditional horology and modern smart technology.
      </p>
      <p className="mb-6">
        Our mission is to empower individuals to lead healthier, more connected lives without sacrificing style. Whether you are scaling a mountain, running a marathon, or attending a board meeting, a Chronos watch is built to be your perfect companion.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <div className="text-center p-6 bg-gray-50 rounded-xl">
           <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <h3 className="text-gray-900 font-bold text-xl mb-2">Innovation</h3>
           <p className="text-sm">Pushing the boundaries of what's possible on your wrist.</p>
        </div>
        <div className="text-center p-6 bg-gray-50 rounded-xl">
           <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <h3 className="text-gray-900 font-bold text-xl mb-2">Quality</h3>
           <p className="text-sm">Aerospace-grade materials and rigorous testing.</p>
        </div>
        <div className="text-center p-6 bg-gray-50 rounded-xl">
           <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
           </div>
           <h3 className="text-gray-900 font-bold text-xl mb-2">Design</h3>
           <p className="text-sm">Award-winning aesthetics that turn heads.</p>
        </div>
      </div>
    </div>
  </div>
);

export const ContactPage: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h1>
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
       <form className="space-y-6">
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
             <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors" />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
             <input type="email" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors" />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
             <textarea rows={4} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"></textarea>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md">
             Send Message
          </button>
       </form>
       <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500">
          <p>support@chronos.com</p>
          <p>1-800-CHRONOS</p>
          <p>123 Tech Blvd, Silicon Valley, CA</p>
       </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-gray-600">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <p className="mb-4">At Chronos, we take your privacy seriously. This policy details how we handle your data.</p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li>We only collect information necessary for order processing.</li>
        <li>We do not sell your personal data to third parties.</li>
        <li>Your payment information is encrypted and processed securely.</li>
      </ul>
      <p className="text-sm text-gray-400">Last updated: Oct 2023</p>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-gray-600">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <p className="mb-4">By using the Chronos website, you agree to the following terms.</p>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li>All product images are for illustration purposes only.</li>
        <li>Prices are subject to change without notice.</li>
        <li>We reserve the right to cancel orders suspected of fraud.</li>
      </ul>
      <p className="text-sm text-gray-400">Last updated: Oct 2023</p>
    </div>
  </div>
);
