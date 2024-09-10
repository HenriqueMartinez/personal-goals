let selectedNumbers = JSON.parse(localStorage.getItem('selectedNumbers')) || [];

function updateTable() {
    const tbody = document.getElementById('numberTable');
    tbody.innerHTML = '';

    let totalDeposited = 0;

    for (let i = 1; i <= 200; i++) {
        const tr = document.createElement('tr');
        const tdNumber = document.createElement('td');
        const tdValue = document.createElement('td');
        const tdCheckbox = document.createElement('td');
        
        tdNumber.textContent = i;
        tdValue.textContent = `$ ${i}.00`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = selectedNumbers.includes(i);
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedNumbers.push(i);
            } else {
                selectedNumbers = selectedNumbers.filter(num => num !== i);
            }
            localStorage.setItem('selectedNumbers', JSON.stringify(selectedNumbers));
            updateSummary();
        });

        tdCheckbox.appendChild(checkbox);

        tr.appendChild(tdNumber);
        tr.appendChild(tdValue);
        tr.appendChild(tdCheckbox);

        tbody.appendChild(tr);

        if (selectedNumbers.includes(i)) {
            totalDeposited += i;
        }
    }

    document.getElementById('totalDeposited').textContent = `$ ${totalDeposited}.00`;
    document.getElementById('progressPercent').textContent = `${((selectedNumbers.length / 200) * 100).toFixed(2)}%`;
}

function updateSummary() {
    let totalDeposited = selectedNumbers.reduce((acc, curr) => acc + curr, 0);
    document.getElementById('totalDeposited').textContent = `$ ${totalDeposited}.00`;
    document.getElementById('progressPercent').textContent = `${((selectedNumbers.length / 200) * 100).toFixed(2)}%`;
}

updateTable();
