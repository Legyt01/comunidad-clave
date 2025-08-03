import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewChargeDialogProps {
  onChargeCreated?: (charge: any) => void;
}

export function NewChargeDialog({ onChargeCreated }: NewChargeDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    apartment: '',
    concept: '',
    amount: '',
    description: '',
    dueDate: ''
  });
  const { toast } = useToast();

  const apartments = [
    'Torre A - 101', 'Torre A - 102', 'Torre A - 201', 'Torre A - 202', 'Torre A - 301', 'Torre A - 302',
    'Torre B - 101', 'Torre B - 102', 'Torre B - 201', 'Torre B - 202', 'Torre B - 301', 'Torre B - 302',
    'Torre C - 101', 'Torre C - 102', 'Torre C - 201', 'Torre C - 202', 'Torre C - 301', 'Torre C - 302'
  ];

  const concepts = [
    'Administración',
    'Multa por ruido',
    'Multa por mascotas',
    'Uso indebido zonas comunes',
    'Mantenimiento extraordinario',
    'Servicios adicionales'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCharge = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      apartment: formData.apartment,
      concept: formData.concept,
      description: formData.description,
      amount: `$${parseInt(formData.amount).toLocaleString()}`,
      status: 'Pendiente',
      method: '-',
      dueDate: formData.dueDate
    };

    onChargeCreated?.(newCharge);
    
    toast({
      title: "Cobro creado exitosamente",
      description: `Se ha generado el cobro para ${formData.apartment}`,
    });

    setFormData({
      apartment: '',
      concept: '',
      amount: '',
      description: '',
      dueDate: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cobro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Cobro</DialogTitle>
          <DialogDescription>
            Genera un nuevo cobro para un apartamento específico
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apartment">Apartamento</Label>
              <Select value={formData.apartment} onValueChange={(value) => setFormData({...formData, apartment: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar apartamento" />
                </SelectTrigger>
                <SelectContent>
                  {apartments.map((apt) => (
                    <SelectItem key={apt} value={apt}>{apt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="concept">Concepto</Label>
              <Select value={formData.concept} onValueChange={(value) => setFormData({...formData, concept: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de cobro" />
                </SelectTrigger>
                <SelectContent>
                  {concepts.map((concept) => (
                    <SelectItem key={concept} value={concept}>{concept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Monto</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1200000"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Fecha de vencimiento</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción del cobro (opcional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Cobro
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}