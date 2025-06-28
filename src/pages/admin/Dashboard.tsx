
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  Activity,
  TrendingUp,
  Clock,
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, label: 'Total Patients', value: '2,453', change: '+12%', color: 'text-blue-600' },
    { icon: Calendar, label: 'Appointments Today', value: '47', change: '+8%', color: 'text-green-600' },
    { icon: UserCheck, label: 'Active Doctors', value: '24', change: '+2%', color: 'text-purple-600' },
    { icon: Activity, label: 'Emergency Cases', value: '12', change: '-15%', color: 'text-red-600' }
  ];

  const recentAppointments = [
    {
      id: '1',
      patient: 'John Doe',
      doctor: 'Dr. Sarah Johnson',
      time: '09:00 AM',
      type: 'Cardiology',
      status: 'confirmed'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      doctor: 'Dr. Michael Chen',
      time: '10:30 AM',
      type: 'Neurology',
      status: 'pending'
    },
    {
      id: '3',
      patient: 'Bob Wilson',
      doctor: 'Dr. Emily Davis',
      time: '02:15 PM',
      type: 'Ophthalmology',
      status: 'completed'
    }
  ];

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      patients: 156,
      rating: 4.9,
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      patients: 132,
      rating: 4.8,
      availability: 'Busy',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const patients = [
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      lastVisit: '2024-01-15',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 32,
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      lastVisit: '2024-01-10',
      status: 'Active'
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

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} premium className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card premium className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Recent Appointments</h3>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.doctor} • {appointment.type}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
                <Badge variant={getStatusColor(appointment.status)} size="sm">
                  {appointment.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card premium className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <Button variant="primary" size="md" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
            <Button variant="outline" size="md" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
            <Button variant="outline" size="md" className="w-full justify-start">
              <UserCheck className="w-4 h-4 mr-2" />
              Add Doctor
            </Button>
            <Button variant="outline" size="md" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Appointments Management</h2>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <Card premium className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Patient</th>
                <th className="text-left p-4 font-medium text-foreground">Doctor</th>
                <th className="text-left p-4 font-medium text-foreground">Date & Time</th>
                <th className="text-left p-4 font-medium text-foreground">Type</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-t border-border">
                  <td className="p-4 text-foreground">{appointment.patient}</td>
                  <td className="p-4 text-foreground">{appointment.doctor}</td>
                  <td className="p-4 text-muted-foreground">{appointment.time}</td>
                  <td className="p-4 text-muted-foreground">{appointment.type}</td>
                  <td className="p-4">
                    <Badge variant={getStatusColor(appointment.status)} size="sm">
                      {appointment.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderDoctors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Doctors Management</h2>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} premium className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                <Badge 
                  variant={doctor.availability === 'Available' ? 'success' : 'warning'} 
                  size="sm"
                >
                  {doctor.availability}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Patients:</span>
                <span className="text-foreground font-medium">{doctor.patients}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rating:</span>
                <span className="text-foreground font-medium">{doctor.rating}/5.0</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Patients Management</h2>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <Card premium className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Name</th>
                <th className="text-left p-4 font-medium text-foreground">Age</th>
                <th className="text-left p-4 font-medium text-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-foreground">Last Visit</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t border-border">
                  <td className="p-4 text-foreground font-medium">{patient.name}</td>
                  <td className="p-4 text-muted-foreground">{patient.age}</td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1" />
                        {patient.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="w-3 h-3 mr-1" />
                        {patient.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{patient.lastVisit}</td>
                  <td className="p-4">
                    <Badge variant="success" size="sm">
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'doctors', label: 'Doctors', icon: UserCheck },
    { id: 'patients', label: 'Patients', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your hospital operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="md">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-border min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
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
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'doctors' && renderDoctors()}
          {activeTab === 'patients' && renderPatients()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
