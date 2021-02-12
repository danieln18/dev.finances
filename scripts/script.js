const Modal = {
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .toggle('active');
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '20/02/2021',
    },
    {
        id: 2,
        description: 'website',
        amount: 500000,
        date: '22/02/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/02/2021',
    },

];

const Transaction = {
    income() {

    },
    expenses() {

    },
    total() {

    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="expense">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="remover transação">
        </td>
        `
        return html
    }
}


transactions.forEach((transaction) => {
    DOM.addTransaction(transaction)
});