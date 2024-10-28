// Rating
document.querySelectorAll('.product').forEach(product => {
    const ratingStars = product.querySelectorAll('.rating .fa-bed');

    ratingStars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingStars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('hovered');
                } else {
                    s.classList.remove('hovered');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            ratingStars.forEach(s => s.classList.remove('hovered'));
        });

        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingStars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
});


  