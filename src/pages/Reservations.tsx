import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Filter, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NewReservationDialog } from '@/components/dialogs/NewReservationDialog';
import { ReservationDetailsDialog } from '@/components/dialogs/ReservationDetailsDialog';
import { generateReservationsReport, downloadReportText } from '@/utils/reportGenerator';
import { useToast } from '@/hooks/use-toast';

export default function Reservations() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>('');
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
    downloadReportText(report);
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
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Ver Calendario
          </Button>
          <NewReservationDialog onReservationCreated={handleNewReservation} />
        </div>
      </div>

      {/* Facility Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Salón Social Torres del Valle</h3>
              <p className="text-sm text-muted-foreground">Capacidad: 50 personas • Horario: 8:00 AM - 11:00 PM</p>
              <p className="text-sm text-muted-foreground">Incluye: Sonido básico, mesas, sillas, cocina</p>
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
    </div>
  );
}