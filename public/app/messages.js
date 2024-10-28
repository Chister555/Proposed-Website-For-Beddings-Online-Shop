document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('messageList');
    const searchInput = document.getElementById('searchInput');
    let messages = []; 

    
    fetch('/api/messages')
        .then(response => response.json())
        .then(data => {
            messages = data; 
            displayMessages(messages); 
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            messageList.innerHTML = `<p class="text-red-500">Failed to load messages.</p>`;
        });

    
    function displayMessages(messages) {
        messageList.innerHTML = ''; 
        if (messages.length > 0) {
            messages.forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('border-b', 'border-gray-300', 'py-4');
                messageDiv.innerHTML = `
                    <p><strong>Name:</strong> ${message.name}</p>
                    <p><strong>Email:</strong> ${message.email}</p>
                    <p><strong>Message:</strong> ${message.message}</p>
                    <p><em>Received on: ${new Date(message.date).toLocaleString()}</em></p>
                `;
                messageList.appendChild(messageDiv);
            });
        } else {
            messageList.innerHTML = `<p class="text-gray-500">No messages found.</p>`;
        }
    }

    // Search functionality
    searchInput.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const filteredMessages = messages.filter(message => {
            return (
                message.name.toLowerCase().includes(filter) ||
                message.email.toLowerCase().includes(filter) ||
                message.message.toLowerCase().includes(filter)
            );
        });
        displayMessages(filteredMessages); 
    });
});
