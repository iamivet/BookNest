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


// =========================
// CUSTOM DROPDOWN FIX
// =========================

//document.addEventListener("DOMContentLoaded", function () {

//    // всички dropdown nav items
//    const dropdownItems = document.querySelectorAll(".nav-item.dropdown");

//    dropdownItems.forEach(item => {

//        const toggle = item.querySelector(".dropdown-toggle");
//        const menu = item.querySelector(".dropdown-menu");

//        if (!toggle || !menu) return;

//        // SHOW MENU
//        item.addEventListener("mouseenter", () => {

//            menu.classList.add("show");
//            toggle.classList.add("show");

//            menu.style.display = "block";

//        });

//        // HIDE MENU
//        item.addEventListener("mouseleave", () => {

//            menu.classList.remove("show");
//            toggle.classList.remove("show");

//            menu.style.display = "none";

//        });

//    });

//});


