export const IVA_RATE = 0.21;

const currencyFormatterEs = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

function roundToCents(amount: number) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function calculateIncludedVat(total: number) {
  const roundedTotal = roundToCents(total);
  const base = roundToCents(roundedTotal / (1 + IVA_RATE));
  const iva = roundToCents(roundedTotal - base);

  return {
    base,
    iva,
    total: roundedTotal,
  };
}

export function formatCurrencyEs(amount: number) {
  return currencyFormatterEs.format(amount);
}
