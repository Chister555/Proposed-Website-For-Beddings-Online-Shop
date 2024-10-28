const cart = [];


function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.push(...JSON.parse(savedCart));
    }
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('hidden'); 
    displayCartItems(); 
}


function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartItemCount = document.getElementById('cartItemCount');
    const cartTotal = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-800">Your cart is empty.</p>';
        cartItemCount.textContent = '0 Items';
        cartTotal.textContent = 'Total: ₱0.00';
    } else {
        let total = 0;
        cartItemCount.textContent = `${cart.reduce((acc, item) => acc + item.quantity, 0)} Items`;

        cart.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.classList.add('flex', 'items-center', 'justify-between', 'gap-4', 'mb-4', 'p-2', 'border-b');
            listItem.innerHTML = `
                <div class="flex items-center">
                    <img src="./src/images/prod${item.id}.jpg" class="w-16 h-16 p-2 shrink-0 bg-gray-200 rounded-md" />
                    <div class="ml-4">
                        <p class="text-sm text-gray-800">${item.name} (${item.quantity})</p>
                        <p class="gray-500 text-xs mt-1">Quantity: ${item.quantity}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <span class="text-base font-bold text-gray-800 mr-4">₱${(item.price * item.quantity).toFixed(2)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] fill-red-500 inline cursor-pointer remove-item" data-index="${index}" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                    </svg>
                </div>
            `;
            cartItemsContainer.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    
    const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(button.getAttribute('data-index'), 10);
            removeItem(index);
        });
    });
}


function removeItem(index) {
    cart.splice(index, 1); 
    saveCart(); 
    displayCartItems(); 
}

// Function to add item to the cart
function addToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
       
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        
        cart.push({ ...item, quantity: item.quantity });
    }

    saveCart(); 
    displayCartItems(); 
}


loadCart();


const container = document.querySelector("#product_container");
const template = document.querySelector("[data-product-container]");

const loadItems = async () => {
    container.innerHTML = ""; 
    try {
        const response = await fetch('/bedding');
        const beddings = await response.json();

        
        console.log('Fetched bedding items:', beddings);

       
        beddings.forEach(item => {
            let { id: bedId, name: bedName, size: bedSize, color: bedColor, category: bedCategory, price: bedPrice, oprice: bedOrigP, img: bedImage } = item;
            addToContainer(bedId, bedName, bedSize, bedColor, bedCategory, bedPrice, bedOrigP, bedImage);
        });
    } catch (error) {
        console.error('Error loading items:', error);
    }
};

// Add a product to the container
const addToContainer = (bedId, bedName, bedSize, bedColor, bedCategory, bedPrice, bedOrigP, bedImage) => {
    const temp = template.content.cloneNode(true);
    const id = temp.querySelector("[data-product-id]");
    const name = temp.querySelector("[data-product-name]");
    const size = temp.querySelector("[data-product-size]");
    const color = temp.querySelector("[data-product-color]");
    const category = temp.querySelector("[data-product-category]");
    const price = temp.querySelector("[data-product-price]");
    const oprice = temp.querySelector("[data-product-oprice]");
    const img = temp.querySelector("[data-product-image]");

    id.setAttribute('data-product-id', bedId);
    img.src = `./src/${bedImage}`; 
    name.textContent = bedName;
    name.title = bedName;
    size.setAttribute('data-product-size', bedSize);
    color.setAttribute('data-product-color', bedColor);
    category.setAttribute('data-product-category', bedCategory);
    price.textContent = bedPrice;
    price.setAttribute('data-product-price', bedPrice);
    oprice.textContent = bedOrigP;

    
    const addToCartButton = temp.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', (e) => {
        e.preventDefault(); 

        const productDetails = {
            id: bedId,
            name: bedName,
            price: parseFloat(bedPrice.replace('₱', '').trim()), 
            quantity: 1 
        };

        
        console.log('Product added to cart:', productDetails);

        addToCart(productDetails); 
    });

    
    container.append(temp);
};


document.addEventListener('DOMContentLoaded', () => {
    loadItems(); 
    displayCartItems(); 
    
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.addEventListener('click', toggleCart);

   
    const closeCartButton = document.getElementById('closeCartButton');
    closeCartButton.addEventListener('click', toggleCart);
});
