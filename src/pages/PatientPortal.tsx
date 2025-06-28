
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navigation from '../components/organisms/Navigation';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import { 
  Calendar, 
  FileText, 
  Clock, 
  User, 
  Download, 
  Eye,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const PatientPortal = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Follow-up',
      location: 'Cardiology Wing, Floor 3',
      status: 'confirmed'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: '2024-02-20',
      time: '2:30 PM',
      type: 'Consultation',
      location: 'Neurology Department, Floor 4',
      status: 'pending'
    }
  ];

  const pastVisits = [
    {
      id: '1',
      doctor: 'Dr. Emily Davis',
      specialty: 'Ophthalmology',
      date: '2024-01-10',
      time: '11:00 AM',
      diagnosis: 'Routine Eye Exam',
      notes: 'Vision improved, prescription updated'
    },
    {
      id: '2',
      doctor: 'Dr. Robert Martinez',
      specialty: 'General Medicine',
      date: '2024-01-05',
      time: '9:30 AM',
      diagnosis: 'Annual Checkup',
      notes: 'Overall health excellent, continue current lifestyle'
    }
  ];

  const medicalRecords = [
    {
      id: '1',
      title: 'Blood Test Results',
      date: '2024-01-15',
      type: 'Lab Report',
      doctor: 'Dr. Sarah Johnson',
      status: 'available'
    },
    {
      id: '2',
      title: 'Chest X-Ray',
      date: '2024-01-10',
      type: 'Imaging',
      doctor: 'Dr. Michael Chen',
      status: 'available'
    },
    {
      id: '3',
      title: 'Prescription History',
      date: '2024-01-05',
      type: 'Prescription',
      doctor: 'Dr. Emily Davis',
      status: 'available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'primary';
    }
  };

  const renderAppointments = () => (
    <div className="space-y-8">
      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Upcoming Appointments</h3>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} premium className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="text-lg font-semibold text-foreground mr-3">
                      {appointment.doctor}
                    </h4>
                    <Badge variant={getStatusColor(appointment.status)} size="sm">
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{appointment.specialty}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {appointment.location}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Visits */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">Recent Visits</h3>
        <div className="space-y-4">
          {pastVisits.map((visit) => (
            <Card key={visit.id} premium className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {visit.doctor}
                  </h4>
                  <p className="text-muted-foreground mb-2">{visit.specialty}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {visit.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {visit.time}
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-xl">
                    <p className="text-sm font-medium text-foreground mb-1">Diagnosis: {visit.diagnosis}</p>
                    <p className="text-sm text-muted-foreground">{visit.notes}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">Medical Records</h3>
        <Button variant="primary" size="md">
          <FileText className="w-4 h-4 mr-2" />
          Upload Record
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicalRecords.map((record) => (
          <Card key={record.id} premium className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="success" size="sm">
                {record.status}
              </Badge>
            </div>
            
            <h4 className="font-semibold text-foreground mb-2">{record.title}</h4>
            <p className="text-sm text-muted-foreground mb-1">Type: {record.type}</p>
            <p className="text-sm text-muted-foreground mb-1">Doctor: {record.doctor}</p>
            <p className="text-sm text-muted-foreground mb-4">Date: {record.date}</p>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <Card premium className="p-8">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {currentUser?.displayName || 'Patient Name'}
            </h3>
            <p className="text-muted-foreground mb-4">Patient ID: #PAT001</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">{currentUser?.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">123 Main St, City, State</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Medical Information</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Blood Type: O+</p>
                  <p>Allergies: None</p>
                  <p>Emergency Contact: Jane Doe (+1 555-987-6543)</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="primary" size="md">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <div className="container-hospital">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Welcome back, <span className="text-gradient bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                {currentUser?.displayName?.split(' ')[0] || 'Patient'}
              </span>
            </h1>
            <p className="text-xl opacity-90">
              Manage your appointments, view medical records, and stay connected with your healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-hospital">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64">
              <Card premium className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {activeTab === 'appointments' && renderAppointments()}
              {activeTab === 'records' && renderRecords()}
              {activeTab === 'profile' && renderProfile()}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientPortal;
