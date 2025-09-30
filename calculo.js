/**
 * Calcula o consumo de energia (kWh) e o custo (R$) de um eletrodoméstico
 * em vários períodos (1, 7, 14, 23 e 30 dias), utilizando a tarifa de PE.
 *
 * @param {string} equipamento - Nome e modelo do equipamento (ex: 'Ventilador Britânia BVT400').
 * @param {number} potenciaWatts - Potência do aparelho em Watts (W).
 * @param {number} usoDiarioHoras - Tempo de uso diário em horas (h).
 * @returns {object} Um objeto contendo os resultados e informações.
 */
function calculo_energia(equipamento, potenciaWatts, usoDiarioHoras) {
    // 1. Tarifa Fixa de Pernambuco (R$/kWh)
    const TARIFA_PERNAMBUCO = 0.85; // R$ 0,85 por kWh (média estimada)

    // 2. Cálculo do Consumo Diário (kWh/dia)
    // Fórmula: (Potência em Watts * Tempo de Uso em Horas) / 1000
    const consumoDiarioKWh = (potenciaWatts * usoDiarioHoras) / 1000;

    // 3. Função Auxiliar para calcular resultados para um período específico
    const calcularResultado = (dias) => {
        // Consumo no Período (kWh) = Consumo Diário * Dias
        const consumoTotalKWh = consumoDiarioKWh * dias;
        
        // Custo no Período (R$) = Consumo Total (kWh) * Tarifa (R$/kWh)
        const custoTotalReais = consumoTotalKWh * TARIFA_PERNAMBUCO;

        return {
            dias: dias,
            consumoKWh: parseFloat(consumoTotalKWh.toFixed(2)),
            custoReais: parseFloat(custoTotalReais.toFixed(2))
        };
    };

    // 4. Criação dos Resultados Finais
    const resultados = {
        equipamento: equipamento,
        potencia: `${potenciaWatts} Watts`,
        usoDiario: `${usoDiarioHoras} horas/dia`,
        tarifaAplicada: `R$ ${TARIFA_PERNAMBUCO.toFixed(2)} / kWh (PE)`,
        
        consumoDiario: calcularResultado(1),
        consumoSemanal: calcularResultado(7),
        consumoQuizenal: calcularResultado(14),
        consumoMensalEspecial: calcularResultado(23), // Período não padrão (23 dias)
        consumoMensal: calcularResultado(30)
    };

    return resultados;
}