//document.addEventListener('DOMContentLoaded', function () {
//    const quantityInputs = document.querySelectorAll('.quantity-input');

//    quantityInputs.forEach(input => {
//        input.addEventListener('input', function () {
//            const row = this.closest('.cart-item');
//            if (!row) return;

//            const priceAttr = row.querySelector('.book-price').getAttribute('data-price');
//            const price = parseFloat(priceAttr);
//            const quantity = parseInt(this.value) || 0;

//            const total = price * quantity;
//            row.querySelector('.item-total').innerText = total.toFixed(2) + " лв.";

//            updateGrandTotal();
//        });
//    });

//    function updateGrandTotal() {
//        let grandTotal = 0;
//        document.querySelectorAll('.item-total').forEach(el => {
//            const val = parseFloat(el.innerText) || 0;
//            grandTotal += val;
//        });
//        const totalDisplay = document.getElementById('grand-total');
//        if (totalDisplay) {
//            totalDisplay.innerText = grandTotal.toFixed(2) + " лв.";
//        }
//    }
//});

//function showElements(btn) {
//    // 1. Намираме реда, в който е натиснат точно този бутон
//    let row = btn.closest(".cart-item");

//    // 2. Намираме елементите САМО в този ред (чрез row.querySelector)
//    let input = row.querySelector(".quantity-input");
//    let form = row.querySelector(".edit-mode");
//    let text = row.querySelector(".quantity-text");
//    let btnChange = btn; // Вече го имаме като аргумент

//    // 3. Показваме инпута и формата, скриваме текста и стария бутон
//    if (input && form) {
//        input.style.display = "inline-block";
//        form.style.display = "inline-block";

//        text.style.display = "none";
//        btnChange.style.display = "none";
//    }
//}

// 1. ТАЗИ ФУНКЦИЯ ПРАВИ САМО ВИЗУАЛНАТА СМЯНА
function showElements(btn) {
    let row = btn.closest(".cart-item");

    let input = row.querySelector(".quantity-input");
    let form = row.querySelector(".edit-mode");
    let text = row.querySelector(".quantity-text");
    let btnChange = btn;

    if (input && form) {
        input.style.display = "inline-block";
        form.style.display = "inline-block";
        text.style.display = "none";
        btnChange.style.display = "none";
    }
}

// 2. ТОВА ПРАВИ ПРИСВОЯВАНЕТО НА СТОЙНОСТТА
document.addEventListener('DOMContentLoaded', function () {

    // Слушаме за всяка промяна в числото на инпута
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', function () {
            const row = this.closest('.cart-item');
            const newValue = this.value; // Това е числото, което потребителят пише

            // Намираме скрития инпут, който е ВЪТРЕ във формата
            const hiddenInput = row.querySelector('.hidden-quantity');

            if (hiddenInput) {
                // ТУК СТАВА МАГИЯТА: Присвояваме стойността на скритото поле
                hiddenInput.value = newValue;
                console.log("Стойността е прехвърлена: " + newValue);
            }

            // Актуализираме тоталите визуално
            const price = parseFloat(row.querySelector('.book-price').getAttribute('data-price'));
            const totalCell = row.querySelector('.item-total');
            if (totalCell) {
                totalCell.innerText = (price * newValue).toFixed(2) + " лв.";
            }

            updateGrandTotal();
        });
    });

    function updateGrandTotal() {
        let grandTotal = 0;
        document.querySelectorAll('.item-total').forEach(el => {
            const val = parseFloat(el.innerText.replace(' лв.', '')) || 0;
            grandTotal += val;
        });
        const totalDisplay = document.getElementById('grand-total');
        if (totalDisplay) {
            totalDisplay.innerText = grandTotal.toFixed(2) + " лв.";
        }
    }
});

