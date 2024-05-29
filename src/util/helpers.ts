export function splitBBL(bbl: string) {
  const bblArr = bbl.split("");
  const boro = bblArr.slice(0, 1).join("");
  const block = bblArr.slice(1, 6).join("");
  const lot = bblArr.slice(6, 10).join("");
  return { boro, block, lot };
}


export function formatMoney(amount: number): string {
  const formatmoney= new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });
  return formatmoney.format(amount);
}
