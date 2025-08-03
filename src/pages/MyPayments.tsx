import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Filter, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function MyPayments() {
  const payments = [
    { id: '1', date: "2024-01-15", concept: "Administración Enero 2024", amount: "$1,200,000", status: "Pagado", method: "Transferencia", reference: "TRF001234" },
    { id: '2', date: "2023-12-15", concept: "Administración Diciembre 2023", amount: "$1,200,000", status: "Pagado", method: "Efectivo", reference: "EFE001235" },
    { id: '3', date: "2023-11-15", concept: "Administración Noviembre 2023", amount: "$1,200,000", status: "Pagado", method: "Transferencia", reference: "TRF001236" },
    { id: '4', date: "2023-10-20", concept: "Multa por ruido excesivo", amount: "$150,000", status: "Pagado", method: "Transferencia", reference: "TRF001237" },
    { id: '5', date: "2023-10-15", concept: "Administración Octubre 2023", amount: "$1,200,000", status: "Pagado", method: "Cheque", reference: "CHE001238" },
    { id: '6', date: "2024-02-15", concept: "Administración Febrero 2024", amount: "$1,200,000", status: "Pendiente", method: "-", reference: "-" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pagado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pendiente':
        return <Clock className="w-4 h-4" />;
      case 'Vencido':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mis Pagos</h1>
          <p className="text-muted-foreground">Historial completo de pagos y estado de cuenta</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </Button>
          <Button variant="default" size="sm">
            Realizar Pago
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pagos Realizados</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pagos Pendientes</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pagado</p>
                <p className="text-2xl font-bold text-foreground">$6,150,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>
            Todos tus pagos de administración, multas y servicios adicionales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{payment.concept}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.date} • {payment.method}
                        {payment.reference !== '-' && ` • Ref: ${payment.reference}`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-foreground">{payment.amount}</p>
                  </div>
                  
                  <Badge className={getStatusColor(payment.status)}>
                    {getStatusIcon(payment.status)}
                    <span className="ml-1">{payment.status}</span>
                  </Badge>
                  
                  {payment.status === 'Pagado' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {payment.status === 'Pendiente' && (
                    <Button variant="default" size="sm">
                      Pagar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}