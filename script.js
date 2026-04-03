// ==================== PRODUITS ====================
let productsDB = [
    { id: 1, name: "Ensemble Enfants", age: "2-3 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0111.jpg" },
    { id: 2, name: "Robe Princesse", age: "Fille 3-5 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0026_041416.jpg" },
    { id: 3, name: "Robe Princesse", age: "Fille 4-5 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0114.jpg" },
    { id: 4, name: "Robe Princesse", age: "Fille 7-8 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0025_041419.jpg" },
    { id: 5, name: "Robe Princesse", age: "Fille 5-7 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0110.jpg" },
    { id: 6, name: "Robe Princesse", age: "Fille 10-12 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0115.jpg" },
    { id: 7, name: "Robe Princesse", age: "Fille 6-7 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0113.jpg" },
    { id: 8, name: "Robe Princesse", age: "Fille 6-7 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0031_041410.jpg" },
    { id: 9, name: "Robe Princesse", age: "Fille 3-5 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0112.jpg" },
    { id: 10, name: "Ensemble Enfants", age: "5-6 ans", price: 2000, category: "filles", image: "images/IMG-20260327-WA0030_041414.jpg" },
    { id: 11, name: "Ensemble Enfants", age: "18-24 mois", price: 2000, category: "bebes", image: "images/IMG-20260329-WA0235_104533.jpg" },
    { id: 12, name: "Ensemble Enfants", age: "5-6 ans", price: 2000, category: "filles", image: "images/IMG-20260329-WA0236_104528.jpg" }
];

let cart = [];

const quartiersParVille = {
    "Libreville": ["Campagne", "cocotier", "gare routière", "rio", "nkembo", "nzeng-ayong"],
    "Akanda": ["gigi", "delta", "4eme cité", "sherko", "cité des ailes"],
    "Ntoum": ["assora", "ntoum centre", "mairie", "préfecture"]
};

// ==================== FONCTIONS ====================

function renderProducts(filtered) {
    const container = document.getElementById('products-grid');
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = `<div class="col-span-full bg-white border border-dashed rounded-3xl p-12 text-center"><p class="text-4xl mb-3">😔</p><p>Aucun produit trouvé</p></div>`;
        return;
    }

    filtered.forEach(product => {
        container.innerHTML += `
        <div class="product-card bg-white rounded-3xl overflow-hidden border border-gray-100">
            <img src="${product.image}" alt="${product.name}" 
                 class="w-full h-64 object-cover"
                 onerror="this.src='https://via.placeholder.com/300x300?text=Image+non+disponible'">
            <div class="p-4">
                <p class="text-sm text-teal-600">${product.age}</p>
                <h4 class="font-semibold text-lg">${product.name}</h4>
                <div class="flex justify-between items-center mt-4">
                    <span class="font-bold">${product.price} FCFA</span>
                    <button onclick="addToCart(${product.id})" class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-2xl text-sm font-medium">Ajouter</button>
                </div>
            </div>
        </div>`;
    });
}

function filterCategory(cat) {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.toggle('active', btn.id === `tab-${cat}`);
    });
    const filtered = cat === 'tous' ? productsDB : productsDB.filter(p => p.category === cat);
    renderProducts(filtered);
}

function addToCart(id) {
    const product = productsDB.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({...product, quantity: 1});
    updateCartBadge();
    showToast(`${product.name} ajouté au panier !`);
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count-badge').textContent = total;
}

function toggleCart() {
    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop.classList.contains('hidden')) {
        backdrop.classList.remove('hidden');
        backdrop.style.display = 'block';
        renderCart();
    } else {
        backdrop.style.display = 'none';
        backdrop.classList.add('hidden');
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = `<div class="flex flex-col items-center justify-center h-full py-12"><div class="text-6xl mb-4">🛒</div><p>Votre panier est vide</p></div>`;
        document.getElementById('cart-total').textContent = '0 FCFA';
        return;
    }
    let total = 0;
    cart.forEach((item, i) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        container.innerHTML += `
        <div class="flex gap-4">
            <img src="${item.image}" class="w-20 h-20 object-cover rounded-2xl" onerror="this.src='https://via.placeholder.com/300x300?text=Image'">
            <div class="flex-1">
                <div class="flex justify-between">
                    <div><p class="font-medium">${item.name}</p><p class="text-xs text-teal-600">${item.age}</p></div>
                    <p class="font-semibold">${itemTotal} FCFA</p>
                </div>
                <div class="flex justify-between mt-3">
                    <div class="flex border border-gray-200 rounded-3xl">
                        <button onclick="changeQuantity(${i}, -1)" class="px-3">-</button>
                        <span class="px-4">${item.quantity}</span>
                        <button onclick="changeQuantity(${i}, 1)" class="px-3">+</button>
                    </div>
                    <button onclick="removeFromCart(${i})" class="text-red-400">Retirer</button>
                </div>
            </div>
        </div>`;
    });
    document.getElementById('cart-total').innerHTML = `<span class="text-teal-600">${total} FCFA</span>`;
}

function changeQuantity(i, delta) {
    cart[i].quantity += delta;
    if (cart[i].quantity < 1) cart.splice(i, 1);
    renderCart();
    updateCartBadge();
}

function removeFromCart(i) {
    cart.splice(i, 1);
    renderCart();
    updateCartBadge();
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    toggleCart();
    setTimeout(() => {
        document.getElementById('checkout-modal').classList.remove('hidden');
        document.getElementById('checkout-modal').style.display = 'flex';
    }, 300);
}

function hideCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
    modal.classList.add('hidden');
}

function updateQuartiers() {
    const ville = document.getElementById('ville-select').value;
    const qSelect = document.getElementById('quartier-select');
    qSelect.innerHTML = `<option value="">Sélectionnez le quartier</option>`;
    if (quartiersParVille[ville]) {
        quartiersParVille[ville].forEach(q => {
            const opt = document.createElement('option');
            opt.value = q;
            opt.textContent = q;
            qSelect.appendChild(opt);
        });
    }
}

function handleCheckout(e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const tel = document.getElementById('telephone').value.trim();
    const ville = document.getElementById('ville-select').value;
    const quartier = document.getElementById('quartier-select').value;

    if (!nom || !tel || !ville || !quartier) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let msg = `🛒 *NOUVELLE COMMANDE - ER-boutiques*\n\n`;
    msg += `👤 *Nom* : ${nom}\n`;
    msg += `📱 *Téléphone* : ${tel}\n`;
    msg += `📍 *Adresse* : ${ville} - ${quartier}\n\n`;
    msg += `🛍️ *Articles :*\n`;
    cart.forEach(item => msg += `• ${item.name} (${item.age}) ×${item.quantity} = ${item.price * item.quantity} FCFA\n`);
    msg += `\n💰 *Total* : ${total} FCFA\nMerci !`;

    window.open(`https://wa.me/24166366683?text=${encodeURIComponent(msg)}`, '_blank');

    hideCheckout();
    cart = [];
    updateCartBadge();
    setTimeout(() => alert("✅ Commande envoyée sur WhatsApp !"), 800);
}

function showToast(text) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#14b8a6;color:white;padding:16px 24px;border-radius:9999px;box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.2);z-index:99999;';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2800);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    if (menu.classList.contains('hidden')) {
        menu.style.display = 'block';
        menu.classList.remove('hidden');
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        menu.style.display = 'none';
        menu.classList.add('hidden');
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
}

function navigateToSection(id) {
    if (id === 'accueil') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function handleSearch() {
    const q = document.getElementById('search-input').value.toLowerCase().trim();
    if (!q) return filterCategory('tous');
    const filtered = productsDB.filter(p => p.name.toLowerCase().includes(q) || p.age.toLowerCase().includes(q));
    renderProducts(filtered);
}

// Initialisation
window.onload = () => {
    renderProducts(productsDB);
    document.getElementById('tab-tous').classList.add('active');
    console.log('%c✅ ER-boutiques chargé avec succès !', 'color:#14b8a6; font-weight:bold');
};