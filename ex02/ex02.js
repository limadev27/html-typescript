export function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural': return 0.80;
        case 'comercial':
        case 'industrial': return 0.95;
    }
}
export function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde': return 0;
        case 'amarela': return consumo * 0.02;
        case 'vermelha1': return consumo * 0.04;
        case 'vermelha2': return consumo * 0.08;
    }
}
export function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde': return 'Condições favoráveis de geração de energia.';
        case 'amarela': return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2': return 'Condições mais caras de geração. Economize!';
        default: return 'Bandeira desconhecida.';
    }
}
console.log(adicionalBandeira(100)); // 0: o parâmetro padrão usa a bandeira verde, sem adicional.
document.getElementById('calcular').addEventListener('click', () => {
    const consumo = document.getElementById('consumo').valueAsNumber;
    const saida = document.getElementById('resultado');
    if (!Number.isFinite(consumo) || consumo <= 0) {
        saida.textContent = 'Informe um consumo válido';
        saida.className = 'erro';
        return;
    }
    const tipo = document.getElementById('tipo').value;
    const bandeira = document.getElementById('bandeira').value;
    const energia = consumo * tarifaPorKwh(tipo), adicional = adicionalBandeira(consumo, bandeira);
    saida.textContent = `Energia: R$ ${energia.toFixed(2)}\nBandeira: R$ ${adicional.toFixed(2)}\nTotal: R$ ${(energia + adicional).toFixed(2)}\n${mensagemBandeira(bandeira)}`;
    saida.className = bandeira !== 'verde' ? 'alerta' : 'sucesso';
});
//# sourceMappingURL=ex02.js.map