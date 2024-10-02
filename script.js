document.addEventListener('DOMContentLoaded', () => {
    let itemCount = 0;

    const container = document.querySelector('.container');
    const addItemButton = document.getElementById('add-item');
    const calculateButton = document.getElementById('calculate');

    // Adicionar novo item
    addItemButton.addEventListener('click', () => {
        itemCount++;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
            <h4>Item ${itemCount}</h4>
            <div class="form-group">
                <label for="product-${itemCount}">Produto:</label>
                <input type="text" id="product-${itemCount}" name="product-${itemCount}">
            </div>
            <div class="form-group">
                <label for="price-${itemCount}">Preço (R$):</label>
                <input type="number" id="price-${itemCount}" name="price-${itemCount}" step="0.01">
            </div>
            <div class="form-group">
                <label for="quantity-${itemCount}">Quantidade:</label>
                <input type="number" id="quantity-${itemCount}" name="quantity-${itemCount}">
            </div>
            <div class="radio-group">
                <label><input type="radio" name="unit-${itemCount}" value="kg" checked> Kg</label>
                <label><input type="radio" name="unit-${itemCount}" value="g"> g</label>
                <label><input type="radio" name="unit-${itemCount}" value="l"> L</label>
                <label><input type="radio" name="unit-${itemCount}" value="ml"> ml</label>
            </div>
            <div class="form-group">
                <button class="remove-item">Remover</button>
            </div>
            <div class="price-per-unit"></div>
        `;

        container.appendChild(itemDiv);

        // Remover item
        itemDiv.querySelector('.remove-item').addEventListener('click', () => {
            itemDiv.remove();
            itemCount--;
            if (itemCount === 0) {
                calculateButton.disabled = true;
            }
        });

        calculateButton.disabled = false;
    });

    // Calcular o preço por unidade
    calculateButton.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        let bestPrice = Infinity;
        let bestItem = null;

        items.forEach((item) => {
            const price = parseFloat(item.querySelector(`input[name^="price"]`).value);
            const quantity = parseFloat(item.querySelector(`input[name^="quantity"]`).value);
            const unit = item.querySelector(`input[name^="unit"]:checked`).value;
            let quantityInKgOrL = quantity;

            // Converter quantidades menores para kg ou litros
            if (unit === 'g') {
                quantityInKgOrL = quantity / 1000;
            } else if (unit === 'ml') {
                quantityInKgOrL = quantity / 1000;
            }

            const pricePerUnit = price / quantityInKgOrL;
            const priceDiv = item.querySelector('.price-per-unit');
            priceDiv.textContent = `Preço por ${unit === 'g' || unit === 'kg' ? 'Kg' : 'Litro'}: R$${pricePerUnit.toFixed(2)}`;

            if (pricePerUnit < bestPrice) {
                bestPrice = pricePerUnit;
                bestItem = item;
            }
        });

        // Remover destaque anterior
        items.forEach(item => item.classList.remove('best-price'));

        // Destacar o melhor item
        if (bestItem) {
            bestItem.classList.add('best-price');
        }
    });
});
