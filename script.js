document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');
    const addItemButton = document.getElementById('add-item');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    addItemButton.addEventListener('click', () => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
            <div class="input-group">
                <label>Nome:</label>
                <input type="text" class="name" required>
            </div>
            <div class="input-group">
                <label>Preço:</label>
                <input type="number" class="price" required>
            </div>
            <div class="input-group">
                <label>Quantidade:</label>
                <input type="number" class="quantity" required>
                <select class="unit">
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="litro">litro</option>
                    <option value="ml">ml</option>
                </select>
            </div>
            <button class="remove-item">Remover</button>
            <div class="price-per-unit"></div>
        `;

        itemsContainer.appendChild(itemDiv);
        calculateButton.disabled = false; // Habilita o botão Calcular após adicionar o primeiro item

        const removeButton = itemDiv.querySelector('.remove-item');
        removeButton.addEventListener('click', () => {
            itemsContainer.removeChild(itemDiv);
            if (itemsContainer.children.length === 0) {
                calculateButton.disabled = true; // Desabilita o botão se não houver itens
            }
        });
    });

    calculateButton.addEventListener('click', () => {
        const items = Array.from(document.querySelectorAll('.item'));
        let bestPrice = Infinity;
        let bestItem = null;

        items.forEach(item => {
            const price = parseFloat(item.querySelector('.price').value);
            const quantity = parseFloat(item.querySelector('.quantity').value);
            const unit = item.querySelector('.unit').value;

            let pricePerUnit;
            if (unit === 'kg' || unit === 'g') {
                pricePerUnit = price / (unit === 'kg' ? quantity : quantity / 1000); // Converte para kg
            } else {
                pricePerUnit = price / (unit === 'litro' ? quantity : quantity / 1000); // Converte para litros
            }

            item.querySelector('.price-per-unit').textContent = `Preço por ${unit}: R$ ${pricePerUnit.toFixed(2)}`;

            if (pricePerUnit < bestPrice) {
                bestPrice = pricePerUnit;
                bestItem = item;
            }
        });

        items.forEach(item => item.classList.remove('highlight')); // Remove a borda amarela de todos os itens
        if (bestItem) {
            bestItem.classList.add('highlight'); // Adiciona a borda amarela ao item com o melhor preço
        }

        resultDiv.textContent = `O melhor preço é: R$ ${bestPrice.toFixed(2)}`;
    });
});
