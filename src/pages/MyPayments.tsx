import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Calendar, Building, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePayments } from '@/contexts/PaymentsContext';
import { PaymentDetailsDialog } from '@/components/dialogs/PaymentDetailsDialog';

export default function MyPaymentsPage() {
  const { user } = useAuth();
  const { getPaymentsByOwner } = usePayments();

  // Get payments for the current user
  const userPayments = user ? getPaymentsByOwner(user.name) : [];

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

  const totalPagado = userPayments
    .filter(p => p.status === 'Pagado')
    .length;
  const totalPendiente = userPayments
    .filter(p => p.status === 'Pendiente')
    .length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mis Pagos</h1>
          <p className="text-muted-foreground">Tu historial de pagos y estado de cuenta</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pagos Realizados</p>
                <p className="text-2xl font-bold text-foreground">{totalPagado}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pagos Pendientes</p>
                <p className="text-2xl font-bold text-foreground">{totalPendiente}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Apartamento</p>
                <p className="text-2xl font-bold text-foreground">{user?.apartment || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>
            Todos tus pagos de administración, multas y servicios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-foreground">{payment.concept}</h3>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {payment.date} {payment.method !== '-' && `• ${payment.method}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Período: {payment.month}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{payment.amount}</p>
                  </div>
                  <PaymentDetailsDialog payment={{
                    ...payment,
                    apartment: user?.apartment || 'N/A',
                    owner: user?.name || 'N/A'
                  }}>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Ver Detalles
                    </button>
                  </PaymentDetailsDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}