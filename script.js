let totalAmount = 0;
const expenses = [];

document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const flag = document.getElementById('flag').value;

    if (!description || isNaN(amount) || amount <= 0) return alert('Invalid input');

    // Update total
    totalAmount += amount;
    updateTotal();

    // Add to expense array and sort
    expenses.push({ description, amount, flag });
    sortExpenses();
    renderExpenses();

    // Clear form
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
});

function updateTotal() {
    document.getElementById('totalAmount').textContent = `Total: ₹${totalAmount.toFixed(2)}`;
}

function sortExpenses() {
    expenses.sort((a, b) => {
        const priority = { red: 1, yellow: 2, green: 3 };
        return priority[a.flag] - priority[b.flag];
    });
}

function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach(({ description, amount, flag }) => {
        const li = document.createElement('li');
        li.classList.add(flag);
        li.innerHTML = `${description} - ₹${amount.toFixed(2)} (${flag}) 
            <button onclick="deleteExpense('${description}', ${amount})">Delete</button>`;
        expenseList.appendChild(li);
    });
}

function deleteExpense(description, amount) {
    const index = expenses.findIndex(exp => exp.description === description && exp.amount === amount);
    if (index > -1) {
        expenses.splice(index, 1);
        totalAmount -= amount;
        updateTotal();
        renderExpenses();
    }
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
