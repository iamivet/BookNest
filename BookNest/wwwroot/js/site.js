document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');

    
    if (searchInput) {
        searchInput.addEventListener('keyup', function () {
            let filter = this.value.toLowerCase();
            let cards = document.querySelectorAll('.book-card');

            cards.forEach(card => {
               
                let title = card.querySelector('.book-title').innerText.toLowerCase();
                let author = card.querySelector('.book-author').innerText.toLowerCase();

              
                if (title.includes(filter) || author.includes(filter)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});