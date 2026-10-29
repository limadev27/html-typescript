export function calcularTotal(valor: number, parcelas: number): number { return parcelas <= 3 ? valor : valor * 1.02 ** parcelas; }
export function simularParcelamento(preco: number, entrada?: number): string {
 const financiado = preco - (typeof entrada !== 'undefined' ? entrada : 0);
 let linhas = '';
 for (let parcelas = 1; parcelas <= 12; parcelas++) {
  if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) { continue; }
  const total = calcularTotal(financiado,parcelas), valor = total / parcelas;
  if (valor < 50) { break; }
  linhas += `<tr><td>${parcelas}x</td><td>R$ ${valor.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${parcelas <= 3 ? 'sem juros' : '2% a.m.'}</td></tr>`;
 }
 return linhas;
}
document.getElementById('simular')!.addEventListener('click', (): void => {
 const preco = (document.getElementById('preco') as HTMLInputElement).valueAsNumber;
 const campo = document.getElementById('entrada') as HTMLInputElement;
 const entrada = campo.value === '' ? 0 : campo.valueAsNumber;
 const saida = document.getElementById('resultado') as HTMLElement;
 const tabela = document.getElementById('parcelas') as HTMLElement;
 tabela.innerHTML = ''; saida.className = '';
 if (!Number.isFinite(preco) || preco <= 0 || !Number.isFinite(entrada) || entrada < 0) { saida.textContent = 'Informe um preço positivo e uma entrada válida'; saida.className = 'erro'; return; }
 if (entrada >= preco) { saida.textContent = 'A entrada cobre o valor total. Não há parcelas.'; return; }
 tabela.innerHTML = campo.value === '' ? simularParcelamento(preco) : simularParcelamento(preco,entrada);
 saida.textContent = `Valor financiado: R$ ${(preco-entrada).toFixed(2)}` + (tabela.innerHTML === '' ? '\nNenhuma opção: parcela mínima de R$ 50.00.' : '');
});
