// Utility functions for generating and downloading reports

export interface Payment {
  status: 'Pagado' | 'Pendiente' | 'Vencido';
  [key: string]: unknown;
}

export interface UserRecord {
  status: string;
  balance: string;
  [key: string]: unknown;
}

export interface Reservation {
  status: 'Aprobada' | 'Pendiente' | 'Completada' | 'Rechazada';
  [key: string]: unknown;
}

interface PaymentsReport {
  title: string;
  generatedAt: string;
  summary: {
    totalPayments: number;
    totalPaid: number;
    totalPending: number;
    totalOverdue: number;
  };
  payments: Payment[];
}

interface UsersReport {
  title: string;
  generatedAt: string;
  summary: {
    totalUsers: number;
    activeUsers: number;
    usersWithDebt: number;
  };
  users: UserRecord[];
}

interface ReservationsReport {
  title: string;
  generatedAt: string;
  summary: {
    totalReservations: number;
    approved: number;
    pending: number;
    completed: number;
  };
  reservations: Reservation[];
}

export const generatePaymentsReport = (payments: Payment[]): PaymentsReport => {
  const reportData: PaymentsReport = {
    title: 'Reporte de Pagos - Torres del Valle',
    generatedAt: new Date().toLocaleDateString('es-ES'),
    summary: {
      totalPayments: payments.length,
      totalPaid: payments.filter(p => p.status === 'Pagado').length,
      totalPending: payments.filter(p => p.status === 'Pendiente').length,
      totalOverdue: payments.filter(p => p.status === 'Vencido').length,
    },
    payments,
  };

  return reportData;
};

export const generateUsersReport = (users: UserRecord[]): UsersReport => {
  const reportData: UsersReport = {
    title: 'Reporte de Usuarios - Torres del Valle',
    generatedAt: new Date().toLocaleDateString('es-ES'),
    summary: {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'Activo').length,
      usersWithDebt: users.filter(u => u.balance !== '$0').length,
    },
    users,
  };

  return reportData;
};

export const generateReservationsReport = (reservations: Reservation[]): ReservationsReport => {
  const reportData: ReservationsReport = {
    title: 'Reporte de Reservas - Torres del Valle',
    generatedAt: new Date().toLocaleDateString('es-ES'),
    summary: {
      totalReservations: reservations.length,
      approved: reservations.filter(r => r.status === 'Aprobada').length,
      pending: reservations.filter(r => r.status === 'Pendiente').length,
      completed: reservations.filter(r => r.status === 'Completada').length,
    },
    reservations,
  };

  return reportData;
};

export const downloadCSV = (data: Record<string, unknown>[], filename: string): void => {
  if (!data.length) return;

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item =>
    Object.values(item)
      .map(value =>
        typeof value === 'string' && value.includes(',')
          ? `"${value}"`
          : String(value)
      )
      .join(',')
  );

  const csvContent = [headers, ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

interface ReportData {
  title: string;
  generatedAt: string;
  summary: Record<string, number>;
  [key: string]: unknown;
}

export const downloadPDF = (reportData: ReportData): void => {
  // Simplified PDF generation - in a real app you'd use a library like jsPDF
  const content = `
    ${reportData.title}
    Generado el: ${reportData.generatedAt}

    RESUMEN:
    ${Object.entries(reportData.summary)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')}

    DATOS:
    ${JSON.stringify(reportData, null, 2)}
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${reportData.title.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};
