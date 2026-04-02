// 1. Base de données produits (Catégories complétées)
const products = [
    { id: 1, name: "Ensemble Enfants 2-3ans", price: 2000, img: "images vetements/IMG-20260327-WA0111.jpg", category: "garçons" },
    { id: 2, name: "Robe Princesse Fille 3-5ans", price: 2000, img: "images vetements/IMG-20260327-WA0026_041416.jpg", category: "filles" },
    { id: 3, name: "Robe Princesse Fille 4-5ans", price: 2000, img: "images vetements/IMG-20260327-WA0114.jpg", category: "filles" },
    { id: 4, name: "Robe Princesse Fille 7-8ans", price: 2000, img: "images vetements/IMG-20260327-WA0025_041419.jpg", category: "filles" },
    { id: 5, name: "Ensemble Bébé 12-18mois", price: 2000, img: "images vetements/IMG-20260329-WA0235_104533.jpg", category: "bébés" },
    { id: 6, name: "Robe Princesse Fille 10-12ans", price: 2000, img: "images vetements/IMG-20260327-WA0115.jpg", category: "filles" },
    { id: 7, name: "Robe Princesse Fille 6-7ans", price: 2000, img: "images vetements/IMG-20260327-WA0113.jpg", category: "filles" },
    { id: 8, name: "Robe Princesse Fille 6-7ans", price: 2000, img: "images vetements/IMG-20260327-WA0031_041410.jpg", category: "filles" },
    { id: 9, name: "Robe Princesse Fille 3-5ans", price: 2000, img: "images vetements/IMG-20260327-WA0112.jpg", category: "filles" },
    { id: 10, name: "Ensemble Enfants 5-6ans", price: 2000, img: "images vetements/IMG-20260327-WA0030_041414.jpg", category: "garçons" },
    { id: 11, name: "Ensemble Enfants 18-24mois", price: 2000, img: "images vetements/IMG-20260329-WA0235_104533.jpg", category: "bébés" },
    { id: 12, name: "Ensemble Enfants 5-6ans", price: 2000, img: "images vetements/IMG-20260329-WA0236_104528.jpg", category: "garçons" },
];

let cart = [];

// 2. Affichage des produits
function displayProducts(filter = "tous") {
    const container = document.getElementById('products-container');
    if(!container) return;
    container.innerHTML = "";

    const filtered = filter === "tous" 
        ? products 
        : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price-tag">${p.price.toLocaleString()} FCFA</p>
            <button class="btn-add-cart" onclick="addToCart(${p.id})">
                <i data-lucide="shopping-bag"></i> Ajouter
            </button>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

// 3. Gestion des filtres
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedCat = btn.textContent.toLowerCase();
        displayProducts(selectedCat === "tous" ? "tous" : selectedCat);
    });
});

// 4. Ajouter au panier
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;
    // Optionnel : Proposer de commander directement après l'ajout
    if(confirm(`${product.name} ajouté ! Voulez-vous finaliser votre commande sur WhatsApp maintenant ?`)) {
        checkoutWhatsApp();
    }
}

// 5. SYSTÈME DE COMMANDE WHATSAPP
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    const phone = "24166366683"; // Ton numéro sans le +
    
    // Calcul du total et liste des produits
    let total = 0;
    let itemsText = "";
    cart.forEach((item, index) => {
        itemsText += `- ${item.name} (${item.price} FCFA)%0A`;
        total += item.price;
    });

    // Construction du message
    let message = `Bonjour ER-boutiques, je souhaite commander :%0A%0A`;
    message += itemsText;
    message += `%0ATotal : ${total} FCFA%0A%0A`;
    message += `*Zones de livraison souhaitée :*%0A`;
    message += `-(Précisez votre quartier : Rio, Nkembo, Delta, Ntoum centre, etc.)`;

    // Ouverture de WhatsApp
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

window.onload = () => displayProducts();