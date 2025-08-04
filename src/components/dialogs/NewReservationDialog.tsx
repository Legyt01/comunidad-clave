import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewReservationDialogProps {
  onReservationCreated?: (reservation: any) => void;
}

export function NewReservationDialog({ onReservationCreated }: NewReservationDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    event: '',
    attendees: '',
    description: '',
    apartment: '',
    owner: ''
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReservation = {
      id: Date.now().toString(),
      date: formData.date,
      time: `${formData.startTime} - ${formData.endTime}`,
      apartment: user?.role === 'admin' ? formData.apartment : user?.apartment || 'Torre A - 301',
      owner: user?.role === 'admin' ? formData.owner : user?.name || 'Usuario',
      event: formData.event,
      status: user?.role === 'admin' ? 'Aprobada' : 'Pendiente',
      attendees: parseInt(formData.attendees)
    };

    onReservationCreated?.(newReservation);
    
    toast({
      title: "Reserva solicitada",
      description: `Tu solicitud para ${formData.date} está pendiente de aprobación`,
    });

    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      event: '',
      attendees: '',
      description: '',
      apartment: '',
      owner: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Reserva del Salón Social</DialogTitle>
          <DialogDescription>
            Solicita el uso del salón social para tu evento
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Fecha del evento</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Hora de inicio</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">Hora de fin</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                required
              />
            </div>
          </div>
          
          {user?.role === 'admin' && (
            <>
              <div>
                <Label htmlFor="apartment">Apartamento</Label>
                <Select value={formData.apartment} onValueChange={(value) => setFormData({...formData, apartment: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un apartamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Torre A - 301">Torre A - 301</SelectItem>
                    <SelectItem value="Torre A - 302">Torre A - 302</SelectItem>
                    <SelectItem value="Torre B - 105">Torre B - 105</SelectItem>
                    <SelectItem value="Torre B - 205">Torre B - 205</SelectItem>
                    <SelectItem value="Torre C - 202">Torre C - 202</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="owner">Propietario</Label>
                <Input
                  id="owner"
                  placeholder="Nombre del propietario"
                  value={formData.owner}
                  onChange={(e) => setFormData({...formData, owner: e.target.value})}
                  required
                />
              </div>
            </>
          )}
          
          <div>
            <Label htmlFor="event">Tipo de evento</Label>
            <Input
              id="event"
              placeholder="Cumpleaños, reunión familiar, celebración..."
              value={formData.event}
              onChange={(e) => setFormData({...formData, event: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="attendees">Número de asistentes</Label>
            <Input
              id="attendees"
              type="number"
              placeholder="25"
              max="50"
              value={formData.attendees}
              onChange={(e) => setFormData({...formData, attendees: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción adicional</Label>
            <Textarea
              id="description"
              placeholder="Detalles adicionales del evento (opcional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Solicitar Reserva
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}