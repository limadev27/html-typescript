export function calcularMedia(n1: number, n2: number): number { return (n1 + n2) / 2; }
export function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
 return Number.isFinite(n1) && Number.isFinite(n2) && Number.isFinite(frequencia) && n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 && frequencia >= 0 && frequencia <= 100;
}
export function situacao(media: number, frequencia: number): string {
 if (frequencia < 75) { return 'Reprovado por falta'; }
 else if (media >= 7) { return 'Aprovado'; }
 else if (media >= 4) { return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`; }
 else { return 'Reprovado por nota'; }
}
document.getElementById('calcular')!.addEventListener('click', (): void => {
 const n1 = (document.getElementById('n1') as HTMLInputElement).valueAsNumber;
 const n2 = (document.getElementById('n2') as HTMLInputElement).valueAsNumber;
 const frequencia = (document.getElementById('frequencia') as HTMLInputElement).valueAsNumber;
 const saida = document.getElementById('resultado') as HTMLElement;
 if (!dadosValidos(n1,n2,frequencia)) { saida.textContent = 'Dados inválidos'; saida.className = 'erro'; return; }
 const media = calcularMedia(n1,n2);
 const nome = (document.getElementById('nome') as HTMLInputElement).value;
 saida.textContent = `${nome}: média ${media.toFixed(1)}. ${situacao(media,frequencia)}`;
 saida.className = situacao(media,frequencia) === 'Aprovado' ? 'sucesso' : 'erro';
});
