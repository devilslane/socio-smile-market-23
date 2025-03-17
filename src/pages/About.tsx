
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  Heart,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-sociodent-50 to-white relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Making Dental Care <span className="text-sociodent-600">Accessible to All</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're on a mission to transform how people access dental care by connecting patients with qualified dentists through convenient consultation options and quality dental products.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/consultation" className="button-primary">
                  Find a Dentist
                </Link>
                <Link to="/marketplace" className="button-secondary">
                  Shop Products
                </Link>
              </div>
            </div>
          </div>
          
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-sociodent-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-sociodent-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </section>
      
        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Revolutionizing Dental Care Since 2020
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    SocioDent was founded with a simple vision: to make quality dental care more accessible, affordable, and convenient for everyone. 
                  </p>
                  <p>
                    Our journey began when our founder, Dr. Emily Torres, realized that many patients were delaying dental care due to inconvenience, cost concerns, or anxiety about visiting a dentist's office.
                  </p>
                  <p>
                    What started as a small teledentistry service in Chicago has grown into a nationwide platform connecting patients with top dentists through virtual consultations, home visits, and traditional clinic appointments.
                  </p>
                  <p>
                    Today, we're proud to have helped over 100,000 patients get the dental care they need, when and where they need it.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="SocioDent team"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <div className="bg-sociodent-100 rounded-full p-2">
                      <Users className="h-6 w-6 text-sociodent-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">500+</p>
                      <p className="text-sm text-gray-600">Qualified Dentists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Makes Us Different
              </h2>
              <p className="text-xl text-gray-600">
                Our core values guide everything we do, from how we build our platform to how we interact with our patients and dentists.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <CheckCircle className="h-8 w-8 text-sociodent-600" />,
                  title: "Quality Care",
                  description: "We partner only with qualified, licensed dentists who meet our high standards of care and professionalism."
                },
                {
                  icon: <Heart className="h-8 w-8 text-sociodent-600" />,
                  title: "Patient-Centered",
                  description: "Everything we do is designed around patient needs, comfort, and convenience. Your dental health comes first."
                },
                {
                  icon: <Award className="h-8 w-8 text-sociodent-600" />,
                  title: "Innovation",
                  description: "We leverage technology to create better dental care experiences, from teledentistry to our digital health records."
                },
                {
                  icon: <Users className="h-8 w-8 text-sociodent-600" />,
                  title: "Inclusivity",
                  description: "We believe everyone deserves access to quality dental care regardless of location, income, or schedule."
                },
                {
                  icon: <MapPin className="h-8 w-8 text-sociodent-600" />,
                  title: "Accessibility",
                  description: "With virtual, home, and clinic options, we make it easy to get the dental care you need on your terms."
                },
                {
                  icon: <Clock className="h-8 w-8 text-sociodent-600" />,
                  title: "Efficiency",
                  description: "We streamline the entire dental care process, from booking appointments to receiving treatment."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-sociodent-50 rounded-full flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      
        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet the Leadership
              </h2>
              <p className="text-xl text-gray-600">
                Our diverse team of experts is passionate about transforming dental care access.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Emily Torres",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Dr. Marcus Johnson",
                  role: "Chief Medical Officer",
                  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Sarah Williams",
                  role: "CTO",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Michael Chen",
                  role: "Head of Operations",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[240px]">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sociodent-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      
        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 mb-6 bg-sociodent-100 text-sociodent-700 rounded-full text-sm font-medium">
                  Contact Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Have questions about our services? We're here to help.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-sociodent-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-sociodent-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Office Location</h3>
                      <p className="text-gray-600">123 Dental Way, Chicago, IL 60601</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-sociodent-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-sociodent-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-sociodent-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-sociodent-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">contact@sociodent.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-sociodent-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-sociodent-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Support Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 8am - 8pm EST</p>
                      <p className="text-gray-600">Saturday: 9am - 5pm EST</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sociodent-500 focus:border-sociodent-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sociodent-500 focus:border-sociodent-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sociodent-500 focus:border-sociodent-500"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sociodent-500 focus:border-sociodent-500"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="button-primary w-full"
                  >
                    Send Message
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
