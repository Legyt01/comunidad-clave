import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Building,
  CreditCard,
  Clock
} from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    {
      title: "Total de Propietarios",
      value: "45",
      description: "Apartamentos ocupados",
      icon: Users,
      trend: "+2 este mes",
      color: "text-primary"
    },
    {
      title: "Pagos del Mes",
      value: "$85,450,000",
      description: "Ingresos de administración",
      icon: DollarSign,
      trend: "+15% vs mes anterior",
      color: "text-success"
    },
    {
      title: "Reservas Pendientes",
      value: "8",
      description: "Salón social",
      icon: Calendar,
      trend: "3 para esta semana",
      color: "text-warning"
    },
    {
      title: "Multas Activas",
      value: "12",
      description: "Sin pagar",
      icon: AlertTriangle,
      trend: "-3 vs mes anterior",
      color: "text-destructive"
    }
  ];

  const recentPayments = [
    { apartment: "Torre A - 301", owner: "María González", amount: "$1,200,000", status: "Pagado", date: "2024-01-15" },
    { apartment: "Torre B - 205", owner: "Carlos Ruiz", amount: "$1,200,000", status: "Pendiente", date: "2024-01-14" },
    { apartment: "Torre A - 102", owner: "Ana Martínez", amount: "$1,350,000", status: "Pagado", date: "2024-01-13" },
    { apartment: "Torre C - 401", owner: "Luis Pérez", amount: "$1,200,000", status: "Pagado", date: "2024-01-12" },
  ];

  const upcomingReservations = [
    { date: "2024-01-20", apartment: "Torre A - 301", owner: "María González", event: "Cumpleaños", status: "Pendiente" },
    { date: "2024-01-22", apartment: "Torre B - 105", owner: "Pedro Silva", event: "Reunión familiar", status: "Aprobada" },
    { date: "2024-01-25", apartment: "Torre C - 202", owner: "Laura Gómez", event: "Celebración", status: "Pendiente" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona todas las operaciones del conjunto residencial</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/payments'}>
            Generar Reporte
          </Button>
          <Button variant="default" size="sm" onClick={() => window.location.href = '/fees'}>
            Nuevo Cobro
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-soft transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    <p className="text-xs text-success mt-1">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-primary/10`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pagos Recientes
                </CardTitle>
                <CardDescription>Últimos movimientos de administración</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/payments'}>Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-foreground">{payment.apartment}</p>
                    <p className="text-sm text-muted-foreground">{payment.owner}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{payment.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === 'Pagado' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reservations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Próximas Reservas
                </CardTitle>
                <CardDescription>Reservas del salón social</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/reservations'}>Gestionar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReservations.map((reservation, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-foreground">{reservation.date}</p>
                    <p className="text-sm text-muted-foreground">{reservation.apartment}</p>
                    <p className="text-xs text-muted-foreground">{reservation.event}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{reservation.owner}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      reservation.status === 'Aprobada' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {reservation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}