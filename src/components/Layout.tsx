import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  LogOut, 
  Home, 
  CreditCard, 
  Calendar, 
  Users, 
  Settings,
  FileText,
  DollarSign
} from 'lucide-react';

export function Layout() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const adminMenuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Usuarios' },
    { path: '/payments', icon: DollarSign, label: 'Pagos' },
    { path: '/reservations', icon: Calendar, label: 'Reservas' },
    { path: '/fees', icon: FileText, label: 'Administración' },
  ];

  const ownerMenuItems = [
    { path: '/dashboard', icon: Home, label: 'Mi Dashboard' },
    { path: '/my-payments', icon: CreditCard, label: 'Mis Pagos' },
    { path: '/reservations', icon: Calendar, label: 'Reservas' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : ownerMenuItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Torres del Valle</h1>
              <p className="text-xs text-muted-foreground">Sistema de Administración</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              {user?.apartment && (
                <p className="text-xs text-muted-foreground">{user.apartment}</p>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className="gap-2 whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}