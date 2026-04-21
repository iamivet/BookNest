document.addEventListener("DOMContentLoaded", function () {
    const bioText = document.getElementById("bioText");
    const readMoreBtn = document.getElementById("readMoreBtn");

    if (bioText && readMoreBtn) {
        // Проверяваме дали текстът е по-дълъг от позволените 6 реда
        if (bioText.scrollHeight > bioText.clientHeight) {
            readMoreBtn.style.display = "inline-block";
        } else {
            readMoreBtn.style.display = "none"; // Крием бутона, ако биографията е кратка
        }

        readMoreBtn.addEventListener("click", function () {
            bioText.classList.toggle("expanded");

            if (bioText.classList.contains("expanded")) {
                readMoreBtn.innerText = "Скрий текста ▲";
            } else {
                readMoreBtn.innerText = "Прочети повече ▼";
            }
        });
    }
});