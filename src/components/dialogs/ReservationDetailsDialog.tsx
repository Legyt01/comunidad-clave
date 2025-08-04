import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MapPin, FileText } from 'lucide-react';

interface ReservationDetailsDialogProps {
  reservation: {
    id: string;
    date: string;
    time: string;
    apartment: string;
    owner: string;
    event: string;
    status: string;
    attendees: number;
  };
  children: React.ReactNode;
}

export function ReservationDetailsDialog({ reservation, children }: ReservationDetailsDialogProps) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalles de la Reserva</DialogTitle>
          <DialogDescription>
            Información completa de la reserva del salón social
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{reservation.event}</h3>
            <Badge className={getStatusColor(reservation.status)}>
              {reservation.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Fecha</p>
                <p className="text-sm text-muted-foreground">{reservation.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Horario</p>
                <p className="text-sm text-muted-foreground">{reservation.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Apartamento</p>
                <p className="text-sm text-muted-foreground">{reservation.apartment}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Propietario</p>
                <p className="text-sm text-muted-foreground">{reservation.owner}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Asistentes</p>
                <p className="text-sm text-muted-foreground">{reservation.attendees} personas</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Información del Salón Social</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Capacidad máxima: 50 personas</p>
              <p>• Incluye: Sonido básico, mesas, sillas, cocina</p>
              <p>• Horario disponible: 8:00 AM - 11:00 PM</p>
              <p>• Depósito requerido: $200,000</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}