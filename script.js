const Modal = {
    openAndClose() {
        // Cancela o evento se for cancelável, sem parar a propagação do mesmo.
       event.preventDefault()
        
        //Abrir ou fechar o modal
        //Adicionar a classe active caso não exista ou remover caso já exista
        document
            .querySelector('.modal-overlay')
            .classList
            .toggle('active')
    },
}

// Armazenar dados da tabela
const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2022'
    },
    {
        id: 2,
        description: 'Criação de Website',
        amount: 500000,
        date: '23/01/2022'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2022'
    },
]

// Funções de soma de entradas, saídas e total
const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        // Somar entradas
        let income = 0
        Transaction.all
            .filter(transaction => transaction.amount > 0) // filtra valores positivos
            .forEach((transaction) => income += transaction.amount)

        return income
    },

    expenses() {
        // Somar saídas
        let expense = 0
        Transaction.all
            .filter(transaction => transaction.amount < 0) // filtra valores positivos
            .forEach((transaction) => expense += transaction.amount)

        return expense
    },

    total() {
        // entradas - saídas
        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'), // Busca tbody no html

    addTransaction(transaction) {  // Cria tag tr e passa o conteúdo como filho da tr
        const tr = document.createElement('tr')
        tr.innerHTML = this.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {  // Conteúdo interno do html (items de transação)
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="remover Transação">
            </td>
        `

        return html
    },

    updateBalance() { // Atualiza os valores dos cards no HTML
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) { // Converte valores para reais
        const signal = Number(value) < 0 ? "- " : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style:"currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {
    submit(event) {
        event.preventDefault()        
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()