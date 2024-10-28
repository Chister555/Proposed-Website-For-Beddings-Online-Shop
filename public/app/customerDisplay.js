import { customers } from "./customerData.js";


function displayCustomers(customers) {
    const tableBody = document.querySelector('#customerTable');
    tableBody.innerHTML = ''; 

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() { 
    
    const filter = this.value.toLowerCase();
    const filteredCustomers = customers.filter(customer => {
        return (
            customer.firstName.toLowerCase().includes(filter) ||
            customer.lastName.toLowerCase().includes(filter) ||
            customer.email.toLowerCase().includes(filter) ||
            customer.phone.toLowerCase().includes(filter) ||
            customer.address.toLowerCase().includes(filter)
        );
    });
    console.log(filteredCustomers)
    displayCustomers(filteredCustomers);
});


displayCustomers(customers);
