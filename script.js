// Controles de acesso ao modal
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

// Armazenamento de dados
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

// Funções de soma de entradas, saídas e total
const Transaction = {
    all: Storage.get(),

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

// Funções de manipulação da DOM
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'), // Busca tbody no html

    addTransaction(transaction, index) {  // Cria tag tr e passa o conteúdo como filho da tr
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {  // Conteúdo interno do html (items de transação)
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="remover Transação">
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

// Funções úteis para formatação de dados
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
    },

    formatAmount(amount) {
        return Number(amount) * 100
    },

    formatDate(date) {
        const splittedDate = date.split("-")

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}

// Funções do formulário
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()

        if( description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "") {
                throw new Error("Por favor, preencha todos os campos")
        }

    },

    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }        
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            
            Form.validateFields()

            const transation = Form.formatValues()
            
            Transaction.add(transation)

            Form.clearFields()

            Modal.openAndClose()

        } catch (error) {
            alert(error.message)
        }
    },
    
}

// Funções de inicialização e recarregamento das transações
const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()