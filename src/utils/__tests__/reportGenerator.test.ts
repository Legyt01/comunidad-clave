import { describe, it, expect } from 'vitest';
import { generatePaymentsReport } from '../reportGenerator';

describe('generatePaymentsReport', () => {
  it('retorna estadísticas de pagos correctas', () => {
    const payments = [
      { status: 'Pagado' },
      { status: 'Pagado' },
      { status: 'Pendiente' },
      { status: 'Vencido' },
    ];

    const report = generatePaymentsReport(payments);

    expect(report.summary.totalPaid).toBe(2);
    expect(report.summary.totalPending).toBe(1);
    expect(report.summary.totalOverdue).toBe(1);
  });
});
