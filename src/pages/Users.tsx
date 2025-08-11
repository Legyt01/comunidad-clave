import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Filter, Building, Mail, Phone } from 'lucide-react';
import { NewUserDialog } from '@/components/dialogs/NewUserDialog';
import { generateUsersReport, downloadReportText } from '@/utils/reportGenerator';
import { useToast } from '@/hooks/use-toast';

export default function UsersPage() {
  const [users, setUsers] = useState([
    { 
      id: '1', 
      name: 'María González', 
      apartment: 'Torre A - 301', 
      email: 'maria.gonzalez@email.com', 
      phone: '+57 300 123 4567', 
      status: 'Activo',
      role: 'Propietario',
      balance: '$0'
    },
    { 
      id: '2', 
      name: 'Carlos Ruiz', 
      apartment: 'Torre B - 205', 
      email: 'carlos.ruiz@email.com', 
      phone: '+57 301 234 5678', 
      status: 'Activo',
      role: 'Propietario',
      balance: '$1,200,000'
    },
    { 
      id: '3', 
      name: 'Ana Martínez', 
      apartment: 'Torre A - 102', 
      email: 'ana.martinez@email.com', 
      phone: '+57 302 345 6789', 
      status: 'Activo',
      role: 'Propietario',
      balance: '$0'
    },
    { 
      id: '4', 
      name: 'Luis Pérez', 
      apartment: 'Torre C - 401', 
      email: 'luis.perez@email.com', 
      phone: '+57 303 456 7890', 
      status: 'Activo',
      role: 'Propietario',
      balance: '$0'
    },
    { 
      id: '5', 
      name: 'Pedro Silva', 
      apartment: 'Torre B - 105', 
      email: 'pedro.silva@email.com', 
      phone: '+57 304 567 8901', 
      status: 'Inactivo',
      role: 'Propietario',
      balance: '$2,400,000'
    },
  ]);
  const { toast } = useToast();

  const handleNewUser = (newUser: any) => {
    setUsers([...users, newUser]);
  };

  const handleGenerateReport = () => {
    const report = generateUsersReport(users);
    downloadReportText(report);
    toast({
      title: "Reporte generado",
      description: "El reporte de usuarios se ha descargado exitosamente",
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'Activo' 
      ? 'bg-success/10 text-success' 
      : 'bg-destructive/10 text-destructive';
  };

  const getBalanceColor = (balance: string) => {
    return balance === '$0' 
      ? 'text-success' 
      : 'text-destructive font-semibold';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">Administra los propietarios del conjunto residencial</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleGenerateReport}>
            <Search className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
          <NewUserDialog onUserCreated={handleNewUser} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Con Deuda</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Apartamentos</p>
                <p className="text-2xl font-bold text-foreground">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Propietarios</CardTitle>
          <CardDescription>
            Información completa de todos los propietarios registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {user.apartment}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {user.email}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {user.phone}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Saldo</p>
                      <p className={`font-medium ${getBalanceColor(user.balance)}`}>
                        {user.balance}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    Ver Pagos
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="default" size="sm">
                    Estado Cuenta
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}