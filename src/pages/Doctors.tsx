
import React, { useState } from 'react';
import Navigation from '../components/organisms/Navigation';
import DoctorCard from '../components/molecules/DoctorCard';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const doctors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '15+ years',
      rating: 4.9,
      availability: 'Available Today',
      bio: 'Leading expert in cardiovascular medicine with extensive experience in interventional cardiology and heart surgery.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      education: 'Harvard Medical School',
      location: 'Cardiology Wing, Floor 3'
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialty: 'Neurologist',
      experience: '12+ years',
      rating: 4.8,
      availability: 'Available Tomorrow',
      bio: 'Specialized in treating complex neurological disorders with a focus on patient-centered care and innovative treatments.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      education: 'Johns Hopkins University',
      location: 'Neurology Department, Floor 4'
    },
    {
      id: '3',
      name: 'Emily Davis',
      specialty: 'Ophthalmologist',
      experience: '10+ years',
      rating: 4.9,
      availability: 'Available This Week',
      bio: 'Expert in advanced eye surgeries and comprehensive vision care for all ages with cutting-edge laser technology.',
      image: 'https://images.unsplash.com/photo-1594824363067-0e39f2c90c6a?w=300&h=300&fit=crop&crop=face',
      education: 'Mayo Clinic College of Medicine',
      location: 'Eye Care Center, Floor 2'
    },
    {
      id: '4',
      name: 'Robert Martinez',
      specialty: 'Pediatrician',
      experience: '18+ years',
      rating: 4.7,
      availability: 'Available Today',
      bio: 'Dedicated pediatrician with expertise in child development, vaccination programs, and family healthcare.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
      education: 'Stanford University School of Medicine',
      location: 'Pediatric Ward, Floor 1'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      specialty: 'Emergency Medicine',
      experience: '14+ years',
      rating: 4.8,
      availability: 'On Call 24/7',
      bio: 'Emergency medicine specialist with extensive trauma care experience and critical care management.',
      image: 'https://images.unsplash.com/photo-1559839734-2b77ea197ac2?w=300&h=300&fit=crop&crop=face',
      education: 'University of Pennsylvania',
      location: 'Emergency Department, Ground Floor'
    },
    {
      id: '6',
      name: 'David Wilson',
      specialty: 'General Medicine',
      experience: '20+ years',
      rating: 4.6,
      availability: 'Available Tomorrow',
      bio: 'Experienced general practitioner focused on preventive care, chronic disease management, and patient wellness.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      education: 'University of California, San Francisco',
      location: 'General Medicine, Floor 2'
    }
  ];

  const specialties = ['all', 'Cardiologist', 'Neurologist', 'Ophthalmologist', 'Pediatrician', 'Emergency Medicine', 'General Medicine'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
      <section className="relative section-padding bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <div className="container-hospital">
          <div className="text-center fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Meet Our <span className="text-gradient bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">Expert Doctors</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
              Our team of highly qualified physicians brings years of experience 
              and dedication to providing exceptional patient care.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding bg-muted/30">
        <div className="container-hospital">
          <Card premium className="p-6 fade-in-up">
            <div className="grid md:grid-cols-3 gap-6 items-end">
              <div>
                <Input
                  label="Search Doctors"
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="primary" size="md">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="section-padding">
        <div className="container-hospital">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} premium hover className="overflow-hidden group">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={doctor.image} 
                      alt={`Dr. ${doctor.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft"></div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      Dr. {doctor.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">{doctor.specialty}</p>
                    <p className="text-sm text-muted-foreground mb-2">{doctor.experience} experience</p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-accent fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">({doctor.rating})</span>
                    </div>

                    <div className="flex items-center justify-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {doctor.location}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{doctor.bio}</p>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      variant="primary" 
                      size="md" 
                      className="w-full"
                      onClick={() => handleBookAppointment(doctor.id)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button 
                      variant="outline" 
                      size="md" 
                      className="w-full"
                      onClick={() => handleViewProfile(doctor.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
