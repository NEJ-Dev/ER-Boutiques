const products = [
    { id: 1, name: "Ensemble Enfants 2-3ans", price: 2000, img: "images vetements/IMG-20260327-WA0111.jpg" },
    { id: 2, name: "Robe Princesse Fille 3-5ans", price: 2000, img: "images vetements/IMG-20260327-WA0026_041416.jpg" },
    { id: 3, name: "Robe Princesse Fille 4-5ans", price: 2000, img: "images vetements/IMG-20260327-WA0114.jpg" },
    { id: 4, name: "Robe Princesse Fille 7-8ans", price: 2000, img: "images vetements/IMG-20260327-WA0025_041419.jpg" },
    { id: 5, name: "Robe Princesse Fille 5-7ans", price: 2000, img: "images vetements/IMG-20260327-WA0110.jpg" },
    { id: 6, name: "Robe Princesse Fille 10-12ans", price: 2000, img: "images vetements/IMG-20260327-WA0115.jpg" },
    { id: 7, name: "Robe Princesse Fille 6-7ans", price: 2000, img: "images vetements/IMG-20260327-WA0113.jpg" },
    { id: 8, name: "Robe Princesse Fille 6-7ans", price: 2000, img: "images vetements/IMG-20260327-WA0031_041410.jpg" },
    { id: 9, name: "Robe Princesse Fille 3-5ans", price: 2000, img: "images vetements/IMG-20260327-WA0112.jpg" },
    { id: 10, name: "Ensemble Enfants 5-6ans", price: 2000, img: "images vetements/IMG-20260327-WA0030_041414.jpg" },
    { id: 11, name: "Ensemble Enfants 18-24mois", price: 2000, img: "images vetements/IMG-20260329-WA0235_104533.jpg" },
    { id: 12, name: "Ensemble Enfants 5-6ans", price: 2000, img: "images vetements/IMG-20260329-WA0236_104528.jpg" },
];

const zones = {
    "Libreville": ["Campagne", "Akanda", "Nzeng-Ayong", "Rio", "Gare Routière"],
    "Ntoum": ["Ntoum Centre", "Mairie", "Préfecture", "Nkan"]
};

let cart = [];
let waLink = "";

function init() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p style="color:#ff8fab; font-weight:bold;">${p.price.toLocaleString()} FCFA</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Ajouter</button>
        </div>
    `).join('');
}

function updateQuarters() {
    const city = document.getElementById('cust-city').value;
    const quarterSelect = document.getElementById('cust-quarter');
    quarterSelect.innerHTML = '<option value="">Choisir le quartier</option>';
    if (city && zones[city]) {
        zones[city].forEach(q => {
            const opt = document.createElement('option');
            opt.value = q; opt.textContent = q;
            quarterSelect.appendChild(opt);
        });
    }
}

function addToCart(id) {
    cart.push(products.find(p => p.id === id));
    updateUI();
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cart.map((item, i) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:14px;">
            <span>${item.name}</span>
            <button onclick="remove(${i})" style="color:red; border:none; background:none; cursor:pointer;">&times;</button>
        </div>
    `).join('');
    const total = cart.reduce((s, item) => s + item.price, 0);
    document.getElementById('cart-total').innerText = total.toLocaleString();
}

function remove(i) { cart.splice(i, 1); updateUI(); }
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('active'); }

function sendOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const city = document.getElementById('cust-city').value;
    const quarter = document.getElementById('cust-quarter').value;

    if (cart.length === 0 || !name || !phone || !city || !quarter) return alert("Infos manquantes !");

    let message = "*Nouvelle commande ER-boutiques*\n\n";
    message += `*Nom :* ${name}\n*Téléphone :* ${phone}\n*Ville :* ${city}\n*Adresse :* ${quarter}, Gabon\n\n`;
    message += `*Produits :*\n`;
    cart.forEach(item => message += `- ${item.name} (${item.price.toLocaleString()} FCFA)\n`);
    const total = cart.reduce((s, item) => s + item.price, 0);
    message += `\n*Total : ${total.toLocaleString()} FCFA.*`;

    waLink = `https://wa.me/24166366683?text=${encodeURIComponent(message)}`;
    document.getElementById('confirm-modal').style.display = 'flex';
}

function finalWhatsAppRedirect() {
    window.open(waLink, '_blank');
    document.getElementById('confirm-modal').style.display = 'none';
    cart = []; updateUI(); toggleCart();
}

init();