document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmountEl = document.getElementById('total-amount');
    const redTotalEl = document.getElementById('red-total');
    const yellowTotalEl = document.getElementById('yellow-total');
    const greenTotalEl = document.getElementById('green-total');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let expenses = [];

    // Add Expense
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const flag = document.getElementById('expense-flag').value;

        if (!name || isNaN(amount)) return;

        const expense = { name, amount, flag };
        expenses.push(expense);
        updateExpenseList();
        expenseForm.reset();
    });

    // Update Expense List
    function updateExpenseList() {
        // Sort expenses by severity
        expenses.sort((a, b) => {
            const priority = { red: 1, yellow: 2, green: 3 };
            return priority[a.flag] - priority[b.flag];
        });

        expenseList.innerHTML = '';
        let total = 0, redTotal = 0, yellowTotal = 0, greenTotal = 0;

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - ₹${expense.amount} (${expense.flag})
                <button onclick="removeExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);

            total += expense.amount;
            if (expense.flag === 'red') redTotal += expense.amount;
            else if (expense.flag === 'yellow') yellowTotal += expense.amount;
            else if (expense.flag === 'green') greenTotal += expense.amount;
        });

        totalAmountEl.textContent = total;
        redTotalEl.textContent = redTotal;
        yellowTotalEl.textContent = yellowTotal;
        greenTotalEl.textContent = greenTotal;
    }

    // Remove Expense
    window.removeExpense = (index) => {
        expenses.splice(index, 1);
        updateExpenseList();
    };

    // Toggle Dark Mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Calculator
    const calcDisplay = document.getElementById('calc-display');
    const calcButtons = document.getElementById('calc-buttons');

    calcButtons.addEventListener('click', (e) => {
        if (!e.target.matches('button')) return;

        const value = e.target.textContent;
        if (value === 'C') {
            calcDisplay.value = '';
        } else if (value === '=') {
            try {
                calcDisplay.value = eval(calcDisplay.value);
            } catch {
                calcDisplay.value = 'Error';
            }
        } else {
            calcDisplay.value += value;
        }
    });
});
