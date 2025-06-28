import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/organisms/Navigation';
import HeroSection from '../components/organisms/HeroSection';
import ServiceCard from '../components/molecules/ServiceCard';
import DoctorCard from '../components/molecules/DoctorCard';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import { 
  Heart, 
  Brain, 
  Eye, 
  Stethoscope, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone,
  Mail,
  Star,
  Users,
  Award,
  Shield
} from 'lucide-react';

const Index = () => {
  const services = [
    {
      id: '1',
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostic and treatment options.',
      icon: <Heart className="w-8 h-8 text-primary" />,
      features: ['ECG & Echo', 'Cardiac Surgery', 'Prevention Programs'],
      available24h: true
    },
    {
      id: '2',
      title: 'Neurology',
      description: 'Expert care for brain, spine, and nervous system conditions.',
      icon: <Brain className="w-8 h-8 text-primary" />,
      features: ['Brain Imaging', 'Stroke Care', 'Neurological Surgery'],
      available24h: true
    },
    {
      id: '3',
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine exams to complex surgeries.',
      icon: <Eye className="w-8 h-8 text-primary" />,
      features: ['Eye Exams', 'Cataract Surgery', 'Retinal Care'],
      available24h: false
    },
    {
      id: '4',
      title: 'General Medicine',
      description: 'Primary care services for all ages with preventive focus.',
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      features: ['Annual Checkups', 'Chronic Care', 'Health Screenings'],
      available24h: false
    }
  ];

  const doctors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '15+ years',
      rating: 4.9,
      availability: 'Available Today',
      bio: 'Leading expert in cardiovascular medicine with extensive experience in interventional cardiology.'
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialty: 'Neurologist',
      experience: '12+ years',
      rating: 4.8,
      availability: 'Available Tomorrow',
      bio: 'Specialized in treating complex neurological disorders with a focus on patient-centered care.'
    },
    {
      id: '3',
      name: 'Emily Davis',
      specialty: 'Ophthalmologist',
      experience: '10+ years',
      rating: 4.9,
      availability: 'Available This Week',
      bio: 'Expert in advanced eye surgeries and comprehensive vision care for all ages.'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Patients Served' },
    { icon: Award, value: '25+', label: 'Awards Won' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Shield, value: '24/7', label: 'Emergency Care' }
  ];

  const handleServiceLearnMore = (serviceId: string) => {
    console.log('Learn more about service:', serviceId);
  };

  const handleBookAppointment = (doctorId: string) => {
    console.log('Book appointment with doctor:', doctorId);
  };

  const handleViewProfile = (doctorId: string) => {
    console.log('View doctor profile:', doctorId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-hospital">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5 mx-auto mb-4">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container-hospital">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Medical Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare services delivered by expert medical professionals 
              using state-of-the-art technology and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={handleServiceLearnMore}
              />
            ))}
          </div>

          <div className="text-center mt-12 fade-in-up">
            <Link to="/services">
              <Button variant="primary" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="section-padding bg-muted/30">
        <div className="container-hospital">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Meet Our <span className="text-gradient">Expert Doctors</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our team of highly qualified physicians brings years of experience 
              and dedication to providing exceptional patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookAppointment={handleBookAppointment}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>

          <div className="text-center mt-12 fade-in-up">
            <Link to="/doctors">
              <Button variant="primary" size="lg">
                View All Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container-hospital">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contact Info */}
            <div className="fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Ready to take the next step in your healthcare journey? 
                Contact us today to schedule your appointment.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">contact@medicare-plus.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Address</div>
                    <div className="text-muted-foreground">123 Medical Center Drive<br />Downtown, NY 10001</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Hours</div>
                    <div className="text-muted-foreground">24/7 Emergency Care<br />Mon-Fri: 8AM-8PM Regular</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/appointments">
                  <Button variant="primary" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Button variant="secondary" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Call
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <Card premium className="p-8 fade-in-up">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <Button variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white section-padding">
        <div className="container-hospital">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <div className="w-6 h-6 rounded bg-white"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">MediCare+</h3>
                <p className="text-sm text-white/80">Excellence in Healthcare</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Committed to providing exceptional healthcare services with compassion, 
              innovation, and the highest standards of medical excellence.
            </p>
            
            <div className="border-t border-white/20 pt-6">
              <p className="text-white/60 text-sm">
                © 2024 MediCare+. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
