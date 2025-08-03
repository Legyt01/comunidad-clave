// Utility functions for generating and downloading reports

export const generatePaymentsReport = (payments: any[]) => {
  const reportData = {
    title: 'Reporte de Pagos - Torres del Valle',
    generatedAt: new Date().toLocaleDateString('es-ES'),
    summary: {
      totalPayments: payments.length,
      totalPaid: payments.filter(p => p.status === 'Pagado').length,
      totalPending: payments.filter(p => p.status === 'Pendiente').length,
      totalOverdue: payments.filter(p => p.status === 'Vencido').length,
    },
    payments: payments
  };

  return reportData;
};

export const generateUsersReport = (users: any[]) => {
  const reportData = {
    title: 'Reporte de Usuarios - Torres del Valle',
    generatedAt: new Date().toLocaleDateString('es-ES'),
    summary: {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'Activo').length,
      usersWithDebt: users.filter(u => u.balance !== '$0').length,
    },
    users: users
  };

  return reportData;
};

export const generateReservationsReport = (reservations: any[]) => {
  const reportData = {
    title: 'Reporte de Reservas - Torres del Valle',
    generatedAt: new Date().toLocaleDateString('es-ES'),
    summary: {
      totalReservations: reservations.length,
      approved: reservations.filter(r => r.status === 'Aprobada').length,
      pending: reservations.filter(r => r.status === 'Pendiente').length,
      completed: reservations.filter(r => r.status === 'Completada').length,
    },
    reservations: reservations
  };

  return reportData;
};

export const downloadCSV = (data: any[], filename: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => 
    Object.values(item).map(value => 
      typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value
    ).join(',')
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

export const downloadPDF = (reportData: any) => {
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