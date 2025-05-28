import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-900 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h3 className="font-bold mb-4 text-lg">About Us</h3>
          <p className="text-sm leading-relaxed">
            We connect top talent with the best companies in Nepal and beyond. Find your dream job today!
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Job Seekers</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Browse Jobs</a></li>
            <li><a href="#" className="hover:underline">Create Profile</a></li>
            <li><a href="#" className="hover:underline">Career Advice</a></li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Employers</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Post a Job</a></li>
            <li><a href="#" className="hover:underline">Search Resumes</a></li>
            <li><a href="#" className="hover:underline">Pricing</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 mt-10 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} CareersNepal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
