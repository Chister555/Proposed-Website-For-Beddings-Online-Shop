// Initialize Google Map
function initMap() {
    const location = { lat: 15.0609, lng: 120.8066 }; 

    const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 16,
    });

    
    new google.maps.Marker({
        position: location,
        map: map,
        title: "Beddings Online Shop",
    });
}
// Form submission handler
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset();
        } else {
            alert("Failed to send message. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
});
