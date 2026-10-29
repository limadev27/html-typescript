type Formatador = (valor: number) => string;
export const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;
export const formatarMeses: Formatador = (meses: number): string => {
 const anos = Math.floor(meses / 12), resto = meses % 12;
 const a = `${anos} ${anos === 1 ? 'ano' : 'anos'}`, m = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
 return anos === 0 ? m : resto === 0 ? a : `${a} e ${m}`;
};
// Objeto de retorno permitido pelo enunciado para exibir os valores finais.
export function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): { meses: number; saldo: number; depositado: number } {
 let meses = 0, saldo = 0, depositado = 0;
 while (saldo < meta) {
  if (meses >= 600) { break; }
  meses++;
  const aporte = meses % 12 === 0 ? deposito * 2 : deposito;
  saldo = saldo * (1 + taxa / 100) + aporte; depositado += aporte;
 }
 return { meses, saldo, depositado };
}
export function exibirValor(rotulo: string, valor: number, formatar: Formatador): string { return `${rotulo}: ${formatar(valor)}`; }
document.getElementById('calcular')!.addEventListener('click', (): void => {
 const meta = (document.getElementById('meta') as HTMLInputElement).valueAsNumber;
 const deposito = (document.getElementById('deposito') as HTMLInputElement).valueAsNumber;
 const campo = document.getElementById('taxa') as HTMLInputElement;
 const taxa = campo.valueAsNumber;
 const saida = document.getElementById('resultado') as HTMLElement;
 if (!Number.isFinite(meta) || !Number.isFinite(deposito) || meta <= 0 || deposito <= 0) { saida.textContent = 'Informe valores positivos'; saida.className = 'erro'; return; }
 if (campo.value !== '' && (!Number.isFinite(taxa) || taxa < 0)) { saida.textContent = 'Informe um rendimento válido, maior ou igual a zero'; saida.className = 'erro'; return; }
 const r = campo.value === '' ? calcularMeses(meta,deposito) : calcularMeses(meta,deposito,taxa);
 const atingiu = r.saldo >= meta;
 saida.className = atingiu ? 'sucesso' : 'erro';
 saida.textContent = (atingiu ? `Você atinge a meta em ${r.meses} meses (${formatarMeses(r.meses)}).` : 'Meta inalcançável em 50 anos.') + '\n' + exibirValor(atingiu ? 'Saldo final' : 'Saldo após 600 meses',r.saldo,formatarReal) + '\n' + exibirValor('Total depositado',r.depositado,formatarReal) + '\n' + exibirValor('Rendimento',r.saldo-r.depositado,formatarReal);
});
