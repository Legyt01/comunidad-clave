import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Plus, Filter, Download, TrendingUp, Building } from 'lucide-react';
import { NewChargeDialog } from '@/components/dialogs/NewChargeDialog';
import { PaymentDetailsDialog } from '@/components/dialogs/PaymentDetailsDialog';
import { generatePaymentsReport, downloadCSV, downloadReportText } from '@/utils/reportGenerator';
import { useToast } from '@/hooks/use-toast';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    { 
      id: '1', 
      date: '2024-01-15', 
      apartment: 'Torre A - 301', 
      owner: 'María González', 
      concept: 'Administración Enero', 
      amount: '$1,200,000', 
      status: 'Pagado',
      method: 'Transferencia',
      month: 'Enero 2024'
    },
    { 
      id: '2', 
      date: '2024-01-14', 
      apartment: 'Torre B - 205', 
      owner: 'Carlos Ruiz', 
      concept: 'Administración Enero', 
      amount: '$1,200,000', 
      status: 'Pendiente',
      method: '-',
      month: 'Enero 2024'
    },
    { 
      id: '3', 
      date: '2024-01-13', 
      apartment: 'Torre A - 102', 
      owner: 'Ana Martínez', 
      concept: 'Administración Enero', 
      amount: '$1,350,000', 
      status: 'Pagado',
      method: 'Efectivo',
      month: 'Enero 2024'
    },
    { 
      id: '4', 
      date: '2024-01-12', 
      apartment: 'Torre C - 401', 
      owner: 'Luis Pérez', 
      concept: 'Administración Enero', 
      amount: '$1,200,000', 
      status: 'Pagado',
      method: 'Cheque',
      month: 'Enero 2024'
    },
    { 
      id: '5', 
      date: '2024-01-10', 
      apartment: 'Torre B - 105', 
      owner: 'Pedro Silva', 
      concept: 'Multa por ruido', 
      amount: '$150,000', 
      status: 'Vencido',
      method: '-',
      month: 'Diciembre 2023'
    },
  ]);
  const { toast } = useToast();

  const handleNewCharge = (newCharge: any) => {
    setPayments([newCharge, ...payments]);
  };

  const handleExportReport = () => {
    const report = generatePaymentsReport(payments);
    downloadReportText(report);
    toast({
      title: "Reporte generado",
      description: "El reporte de pagos se ha descargado exitosamente",
    });
  };

  const handleExportCSV = () => {
    downloadCSV(payments, 'pagos_torres_del_valle');
    toast({
      title: "Datos exportados",
      description: "Los datos se han exportado a CSV exitosamente",
    });
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

  const totalPagado = '$3,750,000';
  const totalPendiente = '$1,350,000';
  const totalVencido = '$150,000';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Pagos</h1>
          <p className="text-muted-foreground">Administra todos los pagos del conjunto residencial</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Filter className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <Download className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
          <NewChargeDialog onChargeCreated={handleNewCharge} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pagado</p>
                <p className="text-2xl font-bold text-foreground">{totalPagado}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendiente</p>
                <p className="text-2xl font-bold text-foreground">{totalPendiente}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vencido</p>
                <p className="text-2xl font-bold text-foreground">{totalVencido}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recaudo %</p>
                <p className="text-2xl font-bold text-foreground">73%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Pagos</CardTitle>
          <CardDescription>
            Historial completo de pagos de administración, multas y servicios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-foreground">{payment.concept}</h3>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {payment.apartment} - {payment.owner}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {payment.date} {payment.method !== '-' && `• ${payment.method}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{payment.amount}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  {payment.status === 'Pagado' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  <PaymentDetailsDialog payment={payment}>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </PaymentDetailsDialog>
                  {payment.status !== 'Pagado' && (
                    <Button variant="default" size="sm">
                      Gestionar
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