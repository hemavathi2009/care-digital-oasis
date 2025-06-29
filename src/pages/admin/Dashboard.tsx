import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
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
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Badge from '../../components/atoms/Badge';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    // Redirect if not admin
    if (userRole && userRole !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }

    // If userRole is still loading, wait
    if (userRole === null && currentUser) {
      return;
    }

    // If we reach here and userRole is 'admin', proceed with setting up real-time listeners
    if (userRole === 'admin') {
      setupRealTimeListeners();
    }
  }, [currentUser, userRole, navigate]);

  const setupRealTimeListeners = () => {
    setLoading(true);

    // Real-time listener for appointments
    const appointmentsRef = collection(db, 'appointments');
    const appointmentsQuery = query(appointmentsRef, orderBy('createdAt', 'desc'));
    const unsubscribeAppointments = onSnapshot(appointmentsQuery, (snapshot) => {
      const appointmentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppointments(appointmentsData);
      console.log('Real-time appointments update:', appointmentsData.length);
    }, (error) => {
      console.error('Error listening to appointments:', error);
      toast.error('Failed to load appointments');
    });

    // Real-time listener for contacts
    const contactsRef = collection(db, 'contacts');
    const contactsQuery = query(contactsRef, orderBy('createdAt', 'desc'));
    const unsubscribeContacts = onSnapshot(contactsQuery, (snapshot) => {
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
      console.log('Real-time contacts update:', contactsData.length);
    }, (error) => {
      console.error('Error listening to contacts:', error);
      toast.error('Failed to load contacts');
    });

    setLoading(false);

    // Cleanup function to unsubscribe from listeners
    return () => {
      unsubscribeAppointments();
      unsubscribeContacts();
    };
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId);
      await updateDoc(appointmentRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Update local state
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ));
      
      toast.success(`Appointment ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      toast.success('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await deleteDoc(doc(db, 'contacts', contactId));
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'primary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Handle Firestore Timestamp
      if (dateString?.toDate) {
        return dateString.toDate().toLocaleDateString();
      }
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const stats = [
    { 
      icon: Users, 
      label: 'Total Appointments', 
      value: appointments.length.toString(), 
      change: '+' + Math.floor(appointments.length * 0.1) + '%', 
      color: 'text-blue-600' 
    },
    { 
      icon: Calendar, 
      label: 'Pending Appointments', 
      value: appointments.filter(apt => apt.status === 'pending').length.toString(), 
      change: '+' + Math.floor(appointments.filter(apt => apt.status === 'pending').length * 0.05) + '%', 
      color: 'text-green-600' 
    },
    { 
      icon: UserCheck, 
      label: 'Completed Today', 
      value: appointments.filter(apt => 
        apt.status === 'completed' && 
        apt.date === new Date().toISOString().split('T')[0]
      ).length.toString(), 
      change: '+' + Math.floor(appointments.filter(apt => apt.status === 'completed').length * 0.02) + '%', 
      color: 'text-purple-600' 
    },
    { 
      icon: Activity, 
      label: 'Contact Messages', 
      value: contacts.length.toString(), 
      change: '+' + Math.floor(contacts.length * 0.15) + '%', 
      color: 'text-red-600' 
    }
  ];

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
            {appointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{appointment.firstName} {appointment.lastName}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.doctor} • {appointment.department}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(appointment.date)} • {appointment.time}</p>
                </div>
                <Badge variant={getStatusColor(appointment.status)} size="sm">
                  {appointment.status || 'pending'}
                </Badge>
              </div>
            ))}
            {appointments.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No appointments yet</p>
            )}
          </div>
        </Card>

        <Card premium className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Recent Contact Messages</h3>
          <div className="space-y-4">
            {contacts.slice(0, 5).map((contact) => (
              <div key={contact.id} className="p-4 border border-border rounded-xl">
                <h4 className="font-medium text-foreground">{contact.firstName} {contact.lastName}</h4>
                <p className="text-sm text-muted-foreground">{contact.subject}</p>
                <p className="text-sm text-muted-foreground truncate">{contact.message}</p>
              </div>
            ))}
            {contacts.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No contact messages yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Appointments Management</h2>
      </div>

      <Card premium className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Patient</th>
                <th className="text-left p-4 font-medium text-foreground">Doctor</th>
                <th className="text-left p-4 font-medium text-foreground">Date & Time</th>
                <th className="text-left p-4 font-medium text-foreground">Department</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-t border-border">
                  <td className="p-4">
                    <div>
                      <p className="text-foreground font-medium">{appointment.firstName} {appointment.lastName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.email}</p>
                      <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{appointment.doctor}</td>
                  <td className="p-4 text-muted-foreground">
                    <div>
                      <p>{formatDate(appointment.date)}</p>
                      <p>{appointment.time}</p>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{appointment.department}</td>
                  <td className="p-4">
                    <Badge variant={getStatusColor(appointment.status)} size="sm">
                      {appointment.status || 'pending'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                      >
                        Confirm
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                      >
                        Complete
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No appointments found
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Contact Messages</h2>
      </div>

      <Card premium className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Name</th>
                <th className="text-left p-4 font-medium text-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-foreground">Subject</th>
                <th className="text-left p-4 font-medium text-foreground">Message</th>
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t border-border">
                  <td className="p-4 text-foreground font-medium">{contact.firstName} {contact.lastName}</td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1" />
                        {contact.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="w-3 h-3 mr-1" />
                        {contact.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{contact.subject}</td>
                  <td className="p-4 text-muted-foreground max-w-xs truncate">{contact.message}</td>
                  <td className="p-4 text-muted-foreground">{formatDate(contact.createdAt?.toDate?.())}</td>
                  <td className="p-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteContact(contact.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {contacts.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No contact messages found
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'contacts', label: 'Contacts', icon: Users }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your hospital operations - Real-time updates enabled</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live Data</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Welcome, {currentUser?.email}
              </span>
              <Button variant="outline" size="md" onClick={logout}>
                Logout
              </Button>
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
          {activeTab === 'contacts' && renderContacts()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
