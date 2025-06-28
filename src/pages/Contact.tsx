
import React, { useState } from 'react';
import Navigation from '../components/organisms/Navigation';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <div className="container-hospital">
          <div className="text-center fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="text-gradient bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Ready to take the next step in your healthcare journey? 
              Contact us today to schedule your appointment or get answers to your questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-hospital">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="fade-in-up">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <Card premium className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Phone Numbers</h4>
                      <div className="space-y-1 text-muted-foreground">
                        <p>General Inquiries: +1 (555) 123-4567</p>
                        <p>Emergency Line: 911</p>
                        <p>Appointments: +1 (555) 123-4568</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card premium className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Email Addresses</h4>
                      <div className="space-y-1 text-muted-foreground">
                        <p>General: contact@medicare-plus.com</p>
                        <p>Appointments: appointments@medicare-plus.com</p>
                        <p>Support: support@medicare-plus.com</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card premium className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Hospital Address</h4>
                      <div className="text-muted-foreground">
                        <p>123 Medical Center Drive</p>
                        <p>Downtown, NY 10001</p>
                        <p>United States</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card premium className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Operating Hours</h4>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Emergency: 24/7</p>
                        <p>Regular Hours: Mon-Fri 8AM-8PM</p>
                        <p>Weekend: Sat-Sun 9AM-5PM</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <Card premium className="p-8 fade-in-up">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-primary" />
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                  />
                </div>
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  icon={<Phone className="w-4 h-4" />}
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="medical">Medical Question</option>
                    <option value="billing">Billing Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                
                <Button variant="primary" size="lg" type="submit" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-hospital">
          <Card premium className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h4>
                <p className="text-muted-foreground">
                  123 Medical Center Drive, Downtown, NY 10001
                </p>
                <Button variant="outline" size="md" className="mt-4">
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
