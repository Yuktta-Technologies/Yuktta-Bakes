export function filterValidPrices(
  prices: any[],
  options: any[]
) {
  const availableValues = new Set<string>();

  options.forEach((opt) => {
    opt.values.forEach((v: any) => {
      availableValues.add(v.code);
    });
  });

  return prices.filter((price) =>
    Object.values(price.combination as Record<string, string>).every((value) =>
      availableValues.has(value)
    )
  );
}
