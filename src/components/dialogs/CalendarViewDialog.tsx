import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, AlertTriangle } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface Reservation {
  id: string;
  date: string;
  time: string;
  apartment: string;
  owner: string;
  event: string;
  status: string;
  attendees: number;
}

interface CalendarViewDialogProps {
  children: React.ReactNode;
  reservations: Reservation[];
}

export function CalendarViewDialog({ children, reservations }: CalendarViewDialogProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const confirmedReservations = reservations.filter(r => r.status === 'Aprobada');
  
  const getReservationsForDate = (date: Date) => {
    return confirmedReservations.filter(reservation => 
      isSameDay(parseISO(reservation.date), date)
    );
  };

  const getDateConflicts = (date: Date) => {
    const dateReservations = getReservationsForDate(date);
    return dateReservations.length > 1 ? dateReservations : [];
  };

  const hasReservations = (date: Date) => {
    return getReservationsForDate(date).length > 0;
  };

  const hasConflicts = (date: Date) => {
    return getDateConflicts(date).length > 0;
  };

  const selectedDateReservations = selectedDate ? getReservationsForDate(selectedDate) : [];
  const selectedDateConflicts = selectedDate ? getDateConflicts(selectedDate) : [];

  const modifiers = {
    hasReservations: confirmedReservations.map(r => parseISO(r.date)),
    hasConflicts: confirmedReservations
      .reduce((acc, reservation) => {
        const date = parseISO(reservation.date);
        const conflicts = getDateConflicts(date);
        if (conflicts.length > 0 && !acc.some(d => isSameDay(d, date))) {
          acc.push(date);
        }
        return acc;
      }, [] as Date[])
  };

  const modifiersStyles = {
    hasReservations: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
    },
    hasConflicts: {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Calendario de Ocupaciones</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border"
            />
            
            {/* Legend */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Leyenda:</h4>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span className="text-xs text-muted-foreground">Día con reserva</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-destructive rounded"></div>
                  <span className="text-xs text-muted-foreground">Conflicto de horarios</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Date Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">
                {selectedDate 
                  ? format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: es })
                  : 'Selecciona una fecha'
                }
              </h3>
              {selectedDateConflicts.length > 0 && (
                <div className="flex items-center space-x-2 mt-2 text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">¡Conflicto de horarios detectado!</span>
                </div>
              )}
            </div>

            {selectedDateReservations.length > 0 ? (
              <div className="space-y-3">
                {selectedDateReservations.map((reservation) => (
                  <Card key={reservation.id} className={`${
                    selectedDateConflicts.some(c => c.id === reservation.id) 
                      ? 'border-destructive bg-destructive/5' 
                      : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{reservation.event}</h4>
                          <Badge variant="secondary">Confirmada</Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{reservation.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{reservation.attendees} personas</span>
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <p><strong>Apartamento:</strong> {reservation.apartment}</p>
                          <p><strong>Propietario:</strong> {reservation.owner}</p>
                        </div>

                        {selectedDateConflicts.some(c => c.id === reservation.id) && (
                          <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                            <strong>⚠️ Conflicto:</strong> Existe solapamiento de horarios con otra reserva en esta fecha.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No hay reservas confirmadas para esta fecha</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}