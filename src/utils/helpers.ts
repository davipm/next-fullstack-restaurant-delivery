export function formatToMoney(value: number | string) {
  const moneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return moneyFormat.format(value as number);
}
