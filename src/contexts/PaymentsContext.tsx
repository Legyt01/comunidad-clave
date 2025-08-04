import React, { createContext, useContext, useState } from 'react';

interface Payment {
  id: string;
  date: string;
  apartment: string;
  owner: string;
  concept: string;
  amount: string;
  status: string;
  method: string;
  month: string;
}

interface PaymentsContextType {
  payments: Payment[];
  addPayment: (payment: Payment) => void;
  getPaymentsByOwner: (ownerName: string) => Payment[];
  updatePaymentStatus: (paymentId: string, status: string) => void;
}

const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);

export function PaymentsProvider({ children }: { children: React.ReactNode }) {
  const [payments, setPayments] = useState<Payment[]>([
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

  const addPayment = (payment: Payment) => {
    setPayments(prev => [payment, ...prev]);
  };

  const getPaymentsByOwner = (ownerName: string) => {
    return payments.filter(payment => payment.owner === ownerName);
  };

  const updatePaymentStatus = (paymentId: string, status: string) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId ? { ...payment, status } : payment
    ));
  };

  return (
    <PaymentsContext.Provider value={{ 
      payments, 
      addPayment, 
      getPaymentsByOwner,
      updatePaymentStatus 
    }}>
      {children}
    </PaymentsContext.Provider>
  );
}

export function usePayments() {
  const context = useContext(PaymentsContext);
  if (context === undefined) {
    throw new Error('usePayments debe ser usado dentro de un PaymentsProvider');
  }
  return context;
}