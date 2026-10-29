const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
export function lerPrecos(texto) {
    const precos = [];
    let ignorados = 0;
    for (const linha of texto.split('\n')) {
        if (precos.length >= 20) {
            break;
        }
        if (linha.trim() === '') {
            continue;
        }
        const normalizado = linha.trim().replace(',', '.');
        const preco = Number(normalizado);
        if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalizado) || !Number.isFinite(preco) || preco <= 0) {
            ignorados++;
            continue;
        }
        precos.push(preco);
    }
    return { precos, ignorados };
}
export function somarItens(...precos) { let total = 0; for (const preco of precos) {
    total += preco;
} return total; }
export function calcularDesconto(total, desconto) {
    if (typeof desconto === 'number') {
        return total * desconto / 100;
    }
    switch (desconto.toUpperCase()) {
        case 'BEMVINDO': return total * 0.10;
        case 'PROMO20': return total * 0.20;
        case 'MENOS15': return total >= 100 ? 15 : 0;
        default: return 0;
    }
}
document.getElementById('fechar').addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(document.getElementById('itens').value);
    const saida = document.getElementById('resultado');
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const cupom = document.getElementById('cupom').value.trim().toUpperCase();
    const subtotal = somarItens(...precos), desconto = cupom === '' ? 0 : calcularDesconto(subtotal, cupom);
    const clube = document.getElementById('fidelidade').checked;
    const fidelidade = clube ? calcularDesconto(subtotal - desconto, 5) : 0;
    const linhas = [`Itens: ${precos.length}` + (ignorados > 0 ? ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})` : ''), `Subtotal: ${formatarReal(subtotal)}`];
    if (cupom !== '') {
        linhas.push(desconto > 0 ? `Cupom ${cupom}: - ${formatarReal(desconto)}` : 'Cupom inválido ou não aplicável');
    }
    if (clube) {
        linhas.push(`Fidelidade (5%): - ${formatarReal(fidelidade)}`);
    }
    linhas.push(`Total a pagar: ${formatarReal(subtotal - desconto - fidelidade)}`);
    saida.textContent = linhas.join('\n');
    saida.className = 'sucesso';
});
//# sourceMappingURL=ex05.js.map