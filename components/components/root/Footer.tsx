import React from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaStethoscope,
  FaAmbulance,
  FaUserMd,
  FaCalendarAlt,
  FaShieldAlt,
  FaHeart
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-slate-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                    <FaStethoscope className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Wezi Medical Centre</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                  Providing exceptional healthcare services 24/7 with compassionate care, 
                  modern facilities, and experienced medical professionals dedicated to your wellbeing.
                </p>
                
                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-blue-300">
                    <FaClock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">24/7 Service</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <FaAmbulance className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Emergency Care</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <FaUserMd className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Expert Doctors</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <FaShieldAlt className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Insurance Accepted</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                    <FaFacebookF className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                    <FaTwitter className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                    <FaInstagram className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                    <FaLinkedinIn className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <FaMapMarkerAlt className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Address</p>
                    <p className="text-white">Mapale, Mzuzu</p>
                    <p className="text-white">Malawi</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <FaPhone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Phone</p>
                    <p className="text-white font-semibold">0880 33 39 80</p>
                    <p className="text-blue-300 text-sm">24/7 Emergency Line</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <FaEnvelope className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Email</p>
                    <p className="text-white">wezi.enquiries@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <FaClock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">Operating Hours</p>
                    <p className="text-white font-semibold">24 Hours Daily</p>
                    <p className="text-blue-300 text-sm">Every Day of the Year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
              <div className="space-y-3">
                <a href="#services" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2 transform">
                  Our Services
                </a>
                <a href="#appointments" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2 transform">
                  Book Appointment
                </a>
                <a href="#emergency" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2 transform">
                  Emergency Services
                </a>
                <a href="#doctors" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2 transform">
                  Our Doctors
                </a>
                <a href="#insurance" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2 transform">
                  Insurance & Billing
                </a>
                <a href="#faq" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2 transform">
                  FAQs
                </a>
                <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2 transform">
                  Contact Us
                </a>
              </div>

              {/* Emergency Button */}
              <div className="mt-8">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                  <FaAmbulance className="w-4 h-4" />
                  Emergency: 0880 33 39 80
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800/30 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <FaHeart className="w-4 h-4 text-red-400 mr-2" />
                <p className="text-gray-400 text-sm">
                  © 2025 Wezi Medical Centre. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#accessibility" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;