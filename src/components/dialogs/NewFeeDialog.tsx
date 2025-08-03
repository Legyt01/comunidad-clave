import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewFeeDialogProps {
  onFeeCreated?: (fee: any) => void;
}

export function NewFeeDialog({ onFeeCreated }: NewFeeDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: '',
    frequency: ''
  });
  const { toast } = useToast();

  const feeTypes = [
    'Administración',
    'Multa',
    'Servicios',
    'Mantenimiento'
  ];

  const frequencies = [
    'Mensual',
    'Trimestral',
    'Semestral',
    'Anual',
    'Por evento',
    'Única'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFee = {
      id: Date.now().toString(),
      type: formData.type,
      description: formData.description,
      amount: `$${parseInt(formData.amount).toLocaleString()}`,
      frequency: formData.frequency,
      status: 'Activa',
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    onFeeCreated?.(newFee);
    
    toast({
      title: "Tarifa creada exitosamente",
      description: `Se ha configurado la tarifa: ${formData.description}`,
    });

    setFormData({
      type: '',
      description: '',
      amount: '',
      frequency: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarifa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Tarifa</DialogTitle>
          <DialogDescription>
            Configura una nueva tarifa, multa o servicio
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de tarifa" />
                </SelectTrigger>
                <SelectContent>
                  {feeTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frequency">Frecuencia</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="Cuota mensual de administración"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          
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

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Tarifa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}