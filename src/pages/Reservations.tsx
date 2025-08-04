import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Plus, Filter, Download, Calendar as CalendarIcon, CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import { NewReservationDialog } from '@/components/dialogs/NewReservationDialog';
import { ReservationDetailsDialog } from '@/components/dialogs/ReservationDetailsDialog';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { generateReservationsReport, downloadPDF } from '@/utils/reportGenerator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const localizer = momentLocalizer(moment);

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([
    { 
      id: '1', 
      date: '2024-01-20', 
      time: '18:00 - 22:00', 
      apartment: 'Torre A - 301', 
      owner: 'María González', 
      event: 'Cumpleaños', 
      status: 'Pendiente', 
      attendees: 25 
    },
    { 
      id: '2', 
      date: '2024-01-22', 
      time: '19:00 - 23:00', 
      apartment: 'Torre B - 105', 
      owner: 'Pedro Silva', 
      event: 'Reunión familiar', 
      status: 'Aprobada', 
      attendees: 15 
    },
    { 
      id: '3', 
      date: '2024-01-25', 
      time: '16:00 - 20:00', 
      apartment: 'Torre C - 202', 
      owner: 'Laura Gómez', 
      event: 'Celebración', 
      status: 'Pendiente', 
      attendees: 30 
    },
    { 
      id: '4', 
      date: '2023-12-25', 
      time: '19:00 - 23:00', 
      apartment: 'Torre A - 301', 
      owner: 'María González', 
      event: 'Celebración navideña', 
      status: 'Completada', 
      attendees: 20 
    },
  ]);
  const { toast } = useToast();
  const { user } = useAuth();

  // Convert reservations to calendar events
  const calendarEvents = reservations.map(reservation => {
    const [startTime, endTime] = reservation.time.split(' - ');
    const startDateTime = moment(`${reservation.date} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate();
    const endDateTime = moment(`${reservation.date} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate();
    
    return {
      id: reservation.id,
      title: `${reservation.event} - ${reservation.apartment}`,
      start: startDateTime,
      end: endDateTime,
      resource: reservation
    };
  });

  const handleNewReservation = (newReservation: any) => {
    setReservations([...reservations, newReservation]);
  };

  const handleApproveReservation = (id: string) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: 'Aprobada' } : r
    ));
    toast({
      title: "Reserva aprobada",
      description: "La solicitud de reserva ha sido aprobada exitosamente",
    });
  };

  const handleRejectReservation = (id: string) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: 'Rechazada' } : r
    ));
    toast({
      title: "Reserva rechazada",
      description: "La solicitud de reserva ha sido rechazada",
    });
  };

  const handleGenerateReport = () => {
    const report = generateReservationsReport(reservations);
    downloadPDF(report);
    toast({
      title: "Reporte generado",
      description: "El reporte de reservas se ha descargado exitosamente",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprobada':
        return 'bg-success/10 text-success';
      case 'Pendiente':
        return 'bg-warning/10 text-warning';
      case 'Rechazada':
        return 'bg-destructive/10 text-destructive';
      case 'Completada':
        return 'bg-muted/10 text-muted-foreground';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const myReservations = user?.role === 'owner' 
    ? reservations.filter(r => r.apartment === user.apartment)
    : reservations;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {user?.role === 'admin' ? 'Gestión de Reservas' : 'Mis Reservas'}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' 
              ? 'Administra todas las reservas del salón social'
              : 'Gestiona tus reservas del salón social'
            }
          </p>
        </div>
        <div className="flex space-x-2">
          {user?.role === 'admin' && (
            <Button variant="outline" size="sm" onClick={handleGenerateReport}>
              <Filter className="w-4 h-4 mr-2" />
              Generar Reporte
            </Button>
          )}
          <NewReservationDialog onReservationCreated={handleNewReservation} />
        </div>
      </div>

      {/* Tabs for List and Calendar View */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Lista de Reservas</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          {/* Social Hall Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Salón Social Torres del Valle</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <span>Capacidad: 50 personas</span>
                    <span>Horario: 8:00 AM - 11:00 PM</span>
                    <span>Incluye: Sonido básico, mesas, sillas, cocina</span>
                    <span>Depósito: $200,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

      {/* Stats for Admin */}
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">1</p>
                <p className="text-sm text-muted-foreground">Aprobadas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-muted-foreground">1</p>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">85%</p>
                <p className="text-sm text-muted-foreground">Ocupación</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.role === 'admin' ? 'Todas las Reservas' : 'Mis Reservas'}
          </CardTitle>
          <CardDescription>
            Lista de reservas del salón social
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-foreground">{reservation.event}</h3>
                        <Badge className={getStatusColor(reservation.status)}>
                          {reservation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {reservation.date} • {reservation.time}
                      </p>
                      {user?.role === 'admin' && (
                        <p className="text-sm text-muted-foreground">
                          {reservation.apartment} - {reservation.owner}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {reservation.attendees} asistentes estimados
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {user?.role === 'admin' && reservation.status === 'Pendiente' && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleRejectReservation(reservation.id)}>
                        Rechazar
                      </Button>
                      <Button variant="default" size="sm" onClick={() => handleApproveReservation(reservation.id)}>
                        Aprobar
                      </Button>
                    </>
                  )}
                  {user?.role === 'owner' && reservation.status === 'Pendiente' && (
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  )}
                  <ReservationDetailsDialog reservation={reservation}>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </ReservationDetailsDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Reservas</CardTitle>
              <CardDescription>
                Vista de calendario con todas las reservas del salón social
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: '600px' }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  messages={{
                    next: "Siguiente",
                    previous: "Anterior", 
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana", 
                    day: "Día",
                    agenda: "Agenda",
                    date: "Fecha",
                    time: "Hora",
                    event: "Evento",
                    noEventsInRange: "No hay eventos en este rango",
                    showMore: total => `+ Ver más (${total})`
                  }}
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: event.resource.status === 'Aprobada' ? '#22c55e' : 
                                      event.resource.status === 'Pendiente' ? '#f59e0b' : 
                                      event.resource.status === 'Completada' ? '#6b7280' : '#ef4444',
                      borderRadius: '4px',
                      opacity: 0.8,
                      color: 'white',
                      border: '0px',
                      display: 'block'
                    }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}