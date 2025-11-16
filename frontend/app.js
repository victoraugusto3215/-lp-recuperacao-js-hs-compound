// Configuração da API - ALTERE ESTA URL para a URL do seu backend em produção
const API_URL = 'http://localhost:8080/api/compound';
// Exemplo para produção: const API_URL = 'https://seu-backend.onrender.com/api/compound';

// Elementos do DOM
const form = document.getElementById('compoundForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const submitBtn = document.getElementById('submitBtn');

// Formatação de moeda em BRL
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Ocultar mensagens
function hideMessages() {
    resultDiv.classList.remove('show');
    errorDiv.classList.remove('show');
}

// Mostrar erro
function showError(message) {
    hideMessages();
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

// Mostrar resultado
function showResult(data, principal) {
    hideMessages();
    
    document.getElementById('amount').textContent = formatCurrency(data.amount);
    document.getElementById('interest').textContent = formatCurrency(data.interest);
    document.getElementById('invested').textContent = formatCurrency(principal);
    
    resultDiv.classList.add('show');
}

// Validação no cliente
function validateInputs(data) {
    if (!data.principal || data.principal <= 0) {
        return 'O valor inicial deve ser maior que zero';
    }
    if (data.rate === undefined || data.rate < 0) {
        return 'A taxa de juros não pode ser negativa';
    }
    if (!data.timesPerYear || data.timesPerYear < 1) {
        return 'A capitalização deve ser no mínimo 1 vez por ano';
    }
    if (!data.years || data.years <= 0) {
        return 'O período deve ser maior que zero';
    }
    if (isNaN(data.principal) || isNaN(data.rate) || isNaN(data.timesPerYear) || isNaN(data.years)) {
        return 'Por favor, insira valores numéricos válidos';
    }
    return null;
}

// Handler do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const principal = parseFloat(document.getElementById('principal').value);
    const ratePercent = parseFloat(document.getElementById('rate').value);
    const timesPerYear = parseInt(document.getElementById('timesPerYear').value);
    const years = parseFloat(document.getElementById('years').value);
    
    // Converter taxa de porcentagem para decimal
    const rate = ratePercent / 100;
    
    const requestData = {
        principal,
        rate,
        timesPerYear,
        years
    };
    
    // Validação no cliente
    const validationError = validateInputs(requestData);
    if (validationError) {
        showError(validationError);
        return;
    }
    
    // Mostrar loading
    hideMessages();
    loadingDiv.classList.add('show');
    submitBtn.disabled = true;
    
    try {
        // Fazer requisição para o backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            // Tratamento de erro do servidor
            throw new Error(data.error || 'Erro ao calcular juros compostos');
        }
        
        // Mostrar resultado
        showResult(data, principal);
        
    } catch (error) {
        console.error('Erro:', error);
        
        if (error.message.includes('Failed to fetch')) {
            showError('Erro de conexão. Verifique se o backend está funcionando.');
        } else {
            showError(error.message);
        }
    } finally {
        // Esconder loading
        loadingDiv.classList.remove('show');
        submitBtn.disabled = false;
    }
});

// Limpar mensagens ao digitar
const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (errorDiv.classList.contains('show')) {
            hideMessages();
        }
    });
});