document.addEventListener('DOMContentLoaded', function () {
    const quantityInputs = document.querySelectorAll('.quantity-input');

    quantityInputs.forEach(input => {
        input.addEventListener('input', function () {
            const row = this.closest('.cart-item');
            if (!row) return;

            const priceAttr = row.querySelector('.book-price').getAttribute('data-price');
            const price = parseFloat(priceAttr);
            const quantity = parseInt(this.value) || 0;

            const total = price * quantity;
            row.querySelector('.item-total').innerText = total.toFixed(2) + " лв.";

            updateGrandTotal();
        });
    });

    function updateGrandTotal() {
        let grandTotal = 0;
        document.querySelectorAll('.item-total').forEach(el => {
            const val = parseFloat(el.innerText) || 0;
            grandTotal += val;
        });
        const totalDisplay = document.getElementById('grand-total');
        if (totalDisplay) {
            totalDisplay.innerText = grandTotal.toFixed(2) + " лв.";
        }
    }
});