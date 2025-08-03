import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, DollarSign, Calendar } from 'lucide-react';

export default function FeesPage() {
  const fees = [
    { 
      id: '1', 
      type: 'Administración', 
      description: 'Cuota mensual de administración', 
      amount: '$1,200,000', 
      frequency: 'Mensual',
      status: 'Activa',
      lastUpdate: '2024-01-01'
    },
    { 
      id: '2', 
      type: 'Multa', 
      description: 'Multa por ruido excesivo', 
      amount: '$150,000', 
      frequency: 'Por evento',
      status: 'Activa',
      lastUpdate: '2023-12-15'
    },
    { 
      id: '3', 
      type: 'Servicios', 
      description: 'Mantenimiento ascensores', 
      amount: '$50,000', 
      frequency: 'Mensual',
      status: 'Activa',
      lastUpdate: '2024-01-01'
    },
    { 
      id: '4', 
      type: 'Multa', 
      description: 'Uso indebido de zonas comunes', 
      amount: '$200,000', 
      frequency: 'Por evento',
      status: 'Activa',
      lastUpdate: '2023-11-20'
    },
    { 
      id: '5', 
      type: 'Administración', 
      description: 'Cuota extraordinaria - Reparaciones', 
      amount: '$800,000', 
      frequency: 'Única',
      status: 'Inactiva',
      lastUpdate: '2023-10-15'
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Administración':
        return 'bg-primary/10 text-primary';
      case 'Multa':
        return 'bg-destructive/10 text-destructive';
      case 'Servicios':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Activa' 
      ? 'bg-success/10 text-success' 
      : 'bg-muted/10 text-muted-foreground';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administración de Tarifas</h1>
          <p className="text-muted-foreground">Gestiona cuotas de administración, multas y servicios adicionales</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Historial
          </Button>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tarifa
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarifas Activas</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cuota Base</p>
                <p className="text-2xl font-bold text-foreground">$1.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Multas Activas</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                <p className="text-sm font-bold text-foreground">Ene 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fees Management */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Tarifas</CardTitle>
          <CardDescription>
            Administra todas las tarifas, multas y servicios del conjunto residencial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fees.map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">{fee.description}</h3>
                        <Badge className={getTypeColor(fee.type)}>
                          {fee.type}
                        </Badge>
                        <Badge className={getStatusColor(fee.status)}>
                          {fee.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Frecuencia: {fee.frequency}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Última actualización: {fee.lastUpdate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">{fee.amount}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Aplicaciones
                  </Button>
                  {fee.status === 'Inactiva' && (
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-soft transition-shadow">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Aplicar Cuota Mensual</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generar cobros de administración para todos los apartamentos
            </p>
            <Button variant="default" size="sm" className="w-full">
              Aplicar Cuotas
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-soft transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-destructive mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Aplicar Multa</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aplicar multa específica a uno o varios apartamentos
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Nueva Multa
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-soft transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-success mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Cobro Extraordinario</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Crear cobro especial para mantenimientos o mejoras
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Crear Cobro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}