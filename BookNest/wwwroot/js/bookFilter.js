document.addEventListener("DOMContentLoaded", function () {
    
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    const bookCards = document.querySelectorAll(".book-card");

    function filterBooks() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;

        bookCards.forEach(card => {
           
            const title = card.querySelector(".book-title").textContent.toLowerCase();
            const author = card.querySelector(".book-author").textContent.toLowerCase();

          
            const category = card.getAttribute("data-category");

           
            const matchesSearch = title.includes(searchText) || author.includes(searchText);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;

           
            if (matchesSearch && matchesCategory) {
                card.style.setProperty('display', '', 'important'); 
            } else {
                card.style.setProperty('display', 'none', 'important');
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterBooks);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterBooks);
    }
});



document.addEventListener("DOMContentLoaded", function () {
   
    const cards = document.querySelectorAll('.book-card');

    cards.forEach(card => {
        
        const badge = card.querySelector('.last-unit-badge');

        if (badge) {
            card.addEventListener('mouseenter', () => {
                badge.classList.add('show');
            });

            card.addEventListener('mouseleave', () => {
                badge.classList.remove('show');
            });
        }
    });
});