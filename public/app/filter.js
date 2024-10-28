import { loadItems, container } from './display.js';

document.addEventListener('DOMContentLoaded', () => {
    const sizeFilters = document.querySelectorAll('input[name="size"]');
    const colorFilters = document.querySelectorAll('input[name="color"]');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const priceMinInput = document.querySelector('input[placeholder="Min"]');
    const priceMaxInput = document.querySelector('input[placeholder="Max"]');
    const applyFiltersButton = document.getElementById('apply-filters');

    function filterProducts() {
        const products = container.querySelectorAll('.bg-white'); 
    
        // Get selected filters
        const selectedSizes = Array.from(sizeFilters).filter(input => input.checked).map(input => input.id);
        const selectedColors = Array.from(colorFilters).filter(input => input.checked).map(input => input.id);
        const selectedCategories = Array.from(categoryFilters).filter(input => input.checked).map(input => input.id);
        const minPrice = parseFloat(priceMinInput.value) || 0; 
        const maxPrice = parseFloat(priceMaxInput.value) || Infinity; 
    
        console.log('Selected Filters:', { selectedSizes, selectedColors, selectedCategories, minPrice, maxPrice });
    
        products.forEach(product => {
            const priceElement = product.querySelector('[data-product-price]'); 
            if (!priceElement) return;
    
           
            const productPrice = parseFloat(priceElement.dataset.productPrice) || 0; 
            const productSize = product.querySelector('[data-product-size]').dataset.productSize || '';
            const productColor = product.querySelector('[data-product-color]').dataset.productColor || '';
            const productCategory = product.querySelector('[data-product-category]').dataset.productCategory || '';
    
            console.log('Product Data:', { productSize, productColor, productCategory, productPrice });
    
           
            const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(productSize);
            const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColor);
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
    
            
            const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;
            console.log('Match Results:', { sizeMatch, colorMatch, categoryMatch, priceMatch });
    
            
            if (sizeMatch && colorMatch && categoryMatch && priceMatch) {
                product.style.display = '';
                console.log('Showing product:', productColor, productSize, productCategory, productPrice);
            } else {
                product.style.display = 'none';
                console.log('Hiding product:', productColor, productSize, productCategory, productPrice);
            }
        });
    }
    
    
    applyFiltersButton.addEventListener('click', filterProducts);

    // Search Filter
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.toLowerCase().trim();
        const products = container.querySelectorAll('.bg-white');

        products.forEach(product => {
            const productNameElement = product.querySelector('.product-name'); 
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();
                product.style.display = productName.includes(searchText) ? '' : 'none';
            }
        });
    });

    
    // loadItems();
});
