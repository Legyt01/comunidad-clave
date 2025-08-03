import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home,
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText
} from 'lucide-react';

export function OwnerDashboard() {
  const { user } = useAuth();

  const accountSummary = {
    monthlyFee: "$1,200,000",
    balance: "$0",
    lastPayment: "2024-01-15",
    nextDue: "2024-02-15",
    status: "Al día"
  };

  const recentPayments = [
    { date: "2024-01-15", concept: "Administración Enero", amount: "$1,200,000", status: "Pagado" },
    { date: "2023-12-15", concept: "Administración Diciembre", amount: "$1,200,000", status: "Pagado" },
    { date: "2023-11-15", concept: "Administración Noviembre", amount: "$1,200,000", status: "Pagado" },
    { date: "2023-10-20", concept: "Multa por ruido", amount: "$150,000", status: "Pagado" },
  ];

  const upcomingPayments = [
    { date: "2024-02-15", concept: "Administración Febrero", amount: "$1,200,000", status: "Pendiente" },
  ];

  const myReservations = [
    { date: "2024-01-20", event: "Cumpleaños", status: "Pendiente aprobación", time: "18:00 - 22:00" },
    { date: "2023-12-25", event: "Celebración navideña", status: "Completada", time: "19:00 - 23:00" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mi Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido/a {user?.name} - {user?.apartment}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Descargar Estado
          </Button>
          <Button variant="default" size="sm">
            Pagar Administración
          </Button>
        </div>
      </div>

      {/* Account Status */}
      <Card className="border-l-4 border-l-success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Estado de Cuenta - {user?.apartment}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Cuota Mensual</p>
              <p className="text-xl font-bold text-foreground">{accountSummary.monthlyFee}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Saldo Actual</p>
              <p className="text-xl font-bold text-success">{accountSummary.balance}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Último Pago</p>
              <p className="text-sm font-medium text-foreground">{accountSummary.lastPayment}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Próximo Vencimiento</p>
              <p className="text-sm font-medium text-foreground">{accountSummary.nextDue}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Estado</p>
              <Badge variant="secondary" className="bg-success/10 text-success">
                <CheckCircle className="w-3 h-3 mr-1" />
                {accountSummary.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Historial de Pagos
                </CardTitle>
                <CardDescription>Últimos pagos realizados</CardDescription>
              </div>
              <Button variant="outline" size="sm">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-foreground">{payment.concept}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{payment.amount}</p>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments & Reservations */}
        <div className="space-y-6">
          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Próximos Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-warning/20 bg-warning/5">
                    <div>
                      <p className="font-medium text-foreground">{payment.concept}</p>
                      <p className="text-sm text-muted-foreground">Vence: {payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{payment.amount}</p>
                      <Badge variant="secondary" className="bg-warning/10 text-warning">
                        <Clock className="w-3 h-3 mr-1" />
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Reservations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Mis Reservas
                  </CardTitle>
                  <CardDescription>Salón social</CardDescription>
                </div>
                <Button variant="outline" size="sm">Nueva Reserva</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myReservations.map((reservation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-foreground">{reservation.date}</p>
                      <p className="text-sm text-muted-foreground">{reservation.event}</p>
                      <p className="text-xs text-muted-foreground">{reservation.time}</p>
                    </div>
                    <div>
                      <Badge 
                        variant="secondary" 
                        className={
                          reservation.status === 'Completada' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }
                      >
                        {reservation.status === 'Completada' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {reservation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}