
function showElements(btn) {
    let row = btn.closest(".cart-item");

    let input = row.querySelector(".quantity-input");
    let form = row.querySelector(".edit-mode");
    let text = row.querySelector(".quantity-text");
    let button = row.querySelector(".otkaz");
    let btnChange = btn;

    if (input && form) {
        input.style.display = "inline-block";
        form.style.display = "inline-block";
        button.style.display = "inline-block";
        text.style.display = "none";
        btnChange.style.display = "none";
    }
}

function hideElements(btn) {
    let row = btn.closest(".cart-item");

    let input = row.querySelector(".quantity-input");
    let form = row.querySelector(".edit-mode");
    let text = row.querySelector(".quantity-text");
    let button = row.querySelector(".change-qty-btn");
    let btnChange = btn;

    if (input && form) {
        input.style.display = "none";
        form.style.display = "none";
        button.style.display = "inline-block";
        text.style.display = "inline-block";
        btnChange.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function () {

    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', function () {
            const row = this.closest('.cart-item');
            const newValue = this.value; 

            
            const hiddenInput = row.querySelector('.hidden-quantity');

            if (hiddenInput) {
              
                hiddenInput.value = newValue;
                console.log("Стойността е прехвърлена: " + newValue);
            }

            
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

