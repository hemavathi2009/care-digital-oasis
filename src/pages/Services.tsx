
import React from 'react';
import Navigation from '../components/organisms/Navigation';
import ServiceCard from '../components/molecules/ServiceCard';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import { 
  Heart, 
  Brain, 
  Eye, 
  Stethoscope, 
  UserCheck, 
  Activity,
  Shield,
  Clock
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: '1',
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostic and treatment options using state-of-the-art equipment.',
      icon: <Heart className="w-8 h-8 text-primary" />,
      features: ['ECG & Echocardiogram', 'Cardiac Surgery', 'Prevention Programs', 'Heart Monitoring'],
      available24h: true,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Neurology',
      description: 'Expert care for brain, spine, and nervous system conditions with cutting-edge technology.',
      icon: <Brain className="w-8 h-8 text-primary" />,
      features: ['Brain Imaging', 'Stroke Care', 'Neurological Surgery', 'Memory Clinic'],
      available24h: true,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine exams to complex surgeries and vision correction.',
      icon: <Eye className="w-8 h-8 text-primary" />,
      features: ['Eye Exams', 'Cataract Surgery', 'Retinal Care', 'LASIK Surgery'],
      available24h: false,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'General Medicine',
      description: 'Primary care services for all ages with preventive focus and comprehensive health management.',
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      features: ['Annual Checkups', 'Chronic Care', 'Health Screenings', 'Preventive Care'],
      available24h: false,
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop'
    },
    {
      id: '5',
      title: 'Emergency Care',
      description: '24/7 emergency medical services with rapid response and advanced life support.',
      icon: <Activity className="w-8 h-8 text-primary" />,
      features: ['Trauma Care', 'Critical Care', 'Emergency Surgery', 'Ambulance Service'],
      available24h: true,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop'
    },
    {
      id: '6',
      title: 'Pediatrics',
      description: 'Specialized healthcare for infants, children, and adolescents with family-centered care.',
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      features: ['Child Health', 'Vaccination', 'Growth Monitoring', 'Developmental Care'],
      available24h: false,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop'
    }
  ];

  const handleServiceLearnMore = (serviceId: string) => {
    console.log('Learn more about service:', serviceId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <div className="container-hospital">
          <div className="text-center fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">Medical Services</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare services delivered by expert medical professionals 
              using state-of-the-art technology and compassionate care.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-hospital">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {services.map((service) => (
              <Card key={service.id} premium hover className="overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5">
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                        {service.icon}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                      {service.available24h && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                          <Clock className="w-3 h-3 mr-1" />
                          24/7 Available
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full"
                    onClick={() => handleServiceLearnMore(service.id)}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-hospital">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need Immediate Medical Attention?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our emergency department is open 24/7 with expert medical staff ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                <Shield className="w-5 h-5 mr-2" />
                Emergency: Call 911
              </Button>
              <Button variant="outline" size="lg">
                <Clock className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
