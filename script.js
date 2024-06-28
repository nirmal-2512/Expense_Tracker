document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const incomeAmount = document.getElementById('income-amount');
    const expenseAmount = document.getElementById('expense-amount');
    const balanceAmount = document.getElementById('balance-amount');
    const filterType = document.getElementById('filter-type');
    const filterCategory = document.getElementById('filter-category');
    const filterDate = document.getElementById('filter-date');
    const applyFilter = document.getElementById('apply-filter');
  
    let transactions = [];
  
    transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('transaction-type').value;
      const amount = parseFloat(document.getElementById('transaction-amount').value);
      const category = document.getElementById('transaction-category').value;
      const description = document.getElementById('transaction-description').value;
      const date = document.getElementById('transaction-date').value;
  
      const transaction = {
        id: Date.now(),
        type,
        amount,
        category,
        description,
        date
      };
  
      transactions.push(transaction);
      updateUI();
      transactionForm.reset();
    });
  
    applyFilter.addEventListener('click', () => {
      updateUI();
    });
  
    function updateUI() {
      const filteredTransactions = transactions.filter(t => {
        if (filterType.value && t.type !== filterType.value) return false;
        if (filterCategory.value && t.category !== filterCategory.value) return false;
        if (filterDate.value && t.date !== filterDate.value) return false;
        return true;
      });
  
      const income = filteredTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const expenses = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
      const balance = income - expenses;
  
      incomeAmount.textContent = `$${income.toFixed(2)}`;
      expenseAmount.textContent = `$${expenses.toFixed(2)}`;
      balanceAmount.textContent = `$${balance.toFixed(2)}`;
  
      transactionList.innerHTML = '';
  
      filteredTransactions.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
            <span>${t.description}</span>
            <span>$${t.amount.toFixed(2)}</span>
            <span>${t.category}</span>
            <span>${t.date}</span>
          </div>
          <div>
            <button onclick="editTransaction(${t.id})">Edit</button>
            <button onclick="deleteTransaction(${t.id})">Delete</button>
          </div>
        `;
        transactionList.appendChild(li);
      });
    }
  
    window.editTransaction = function(id) {
      const transaction = transactions.find(t => t.id === id);
      document.getElementById('transaction-type').value = transaction.type;
      document.getElementById('transaction-amount').value = transaction.amount;
      document.getElementById('transaction-category').value = transaction.category;
      document.getElementById('transaction-description').value = transaction.description;
      document.getElementById('transaction-date').value = transaction.date;
  
      transactions = transactions.filter(t => t.id !== id);
      updateUI();
    }
  
    window.deleteTransaction = function(id) {
      transactions = transactions.filter(t => t.id !== id);
      updateUI();
    }
  });