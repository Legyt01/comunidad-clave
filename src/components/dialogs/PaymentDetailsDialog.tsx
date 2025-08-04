import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, FileText, Building, AlertCircle } from 'lucide-react';

interface PaymentDetailsDialogProps {
  payment: {
    id: string;
    apartment: string;
    owner: string;
    amount: string;
    status: string;
    date: string;
    concept: string;
    month: string;
  };
  children: React.ReactNode;
}

export function PaymentDetailsDialog({ payment, children }: PaymentDetailsDialogProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pagado':
        return 'bg-success/10 text-success';
      case 'Pendiente':
        return 'bg-warning/10 text-warning';
      case 'Vencido':
        return 'bg-destructive/10 text-destructive';
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
          <DialogTitle>Detalles del Pago</DialogTitle>
          <DialogDescription>
            Información completa del cobro de administración
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{payment.amount}</h3>
            <Badge className={getStatusColor(payment.status)}>
              {payment.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Apartamento</p>
                <p className="text-sm text-muted-foreground">{payment.apartment}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Propietario</p>
                <p className="text-sm text-muted-foreground">{payment.owner}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Concepto</p>
                <p className="text-sm text-muted-foreground">{payment.concept}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Período</p>
                <p className="text-sm text-muted-foreground">{payment.month}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Fecha de pago</p>
                <p className="text-sm text-muted-foreground">{payment.date}</p>
              </div>
            </div>
          </div>

          {payment.status === 'Vencido' && (
            <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <p className="font-medium text-destructive">Pago Vencido</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Este pago está vencido. Se pueden aplicar intereses de mora según el reglamento.
              </p>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Desglose del Pago</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Administración</span>
                <span>$1,000,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aseo</span>
                <span>$150,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vigilancia</span>
                <span>$50,000</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>{payment.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}