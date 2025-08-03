import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewUserDialogProps {
  onUserCreated?: (user: any) => void;
}

export function NewUserDialog({ onUserCreated }: NewUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    apartment: '',
    role: 'Propietario'
  });
  const { toast } = useToast();

  const apartments = [
    'Torre A - 101', 'Torre A - 102', 'Torre A - 201', 'Torre A - 202', 'Torre A - 301', 'Torre A - 302',
    'Torre B - 101', 'Torre B - 102', 'Torre B - 201', 'Torre B - 202', 'Torre B - 301', 'Torre B - 302',
    'Torre C - 101', 'Torre C - 102', 'Torre C - 201', 'Torre C - 202', 'Torre C - 301', 'Torre C - 302'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      apartment: formData.apartment,
      email: formData.email,
      phone: formData.phone,
      status: 'Activo',
      role: formData.role,
      balance: '$0'
    };

    onUserCreated?.(newUser);
    
    toast({
      title: "Usuario creado exitosamente",
      description: `Se ha registrado ${formData.name} en ${formData.apartment}`,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      apartment: '',
      role: 'Propietario'
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Agrega un nuevo propietario al sistema
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="María González"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

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
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="maria.gonzalez@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              placeholder="+57 300 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Usuario
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}