
let cart=[]

let products=[
{
name:"Robe Enfants 4-5ans",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0114.jpg"
},
{
name:"Robe Enfants 5-7ans",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0110.jpg"
},
{
name:"Robe Enfants 10 -12ans",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0115.jpg"
},
{
name:"Ensemble Enfants 2-3ans",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0111.jpg"
},
{
name:"Robe Enfants 3-5ans",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0112.jpg"
},
{
name:"Robe Enfants 6-7ans",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0113.jpg"
},
{
name:"Robe Enfants 6-7ans",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0025_041419.jpg"
},
{
name:"Robe Enfants",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0026_041416.jpg"
},
{
name:"Ensemble Tee-Shirts Culottes Enfants",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0030_041414.jpg"
},
{
name:"Robe Enfants",
price:2000,
stock:10,
image:"images vetements/IMG-20260327-WA0031_041410.jpg"
},
]

let orders=JSON.parse(localStorage.getItem("orders")) || []

const adminPassword="ER2026"



function renderProducts(){

const container=document.getElementById("products")

container.innerHTML=""

products.forEach((p,i)=>{

let card=document.createElement("div")

card.className="card"

card.innerHTML=`

<img src="${p.image}">

<h3>${p.name}</h3>

<p>${p.price} Fcfa</p>

<p>Stock : ${p.stock}</p>

<button onclick="addToCart(${i})" ${p.stock==0?'disabled':''}>
Ajouter au panier
</button>

`

container.appendChild(card)

})

}



function addToCart(i){

let product=products[i]

if(product.stock>0){

cart.push(product)

product.stock--

renderProducts()

renderCart()

}

}



function renderCart(){

let list=document.getElementById("cart-items")

list.innerHTML=""

let total=0

cart.forEach(p=>{

let li=document.createElement("li")

li.textContent=p.name+" - "+p.price+" Fcfa"

list.appendChild(li)

total+=p.price

})

document.getElementById("total").textContent=total

}



function searchProduct(){

let input=document.getElementById("search").value.toLowerCase()

let cards=document.querySelectorAll(".card")

cards.forEach(card=>{

let title=card.querySelector("h3").textContent.toLowerCase()

card.style.display=title.includes(input) ? "block":"none"

})

}



function showCheckout(){

if(cart.length==0){

alert("Panier vide")

return

}

document.getElementById("checkout").style.display="block"

}

function confirmOrder(){

let name=document.getElementById("customerName").value
let phone=document.getElementById("phone").value
let city=document.getElementById("city").value
let address=document.getElementById("address").value

let total=document.getElementById("total").textContent

let message="Nouvelle commande ER Boutique %0A%0A"

message+="Nom : "+name+"%0A"
message+="Téléphone : "+phone+"%0A"
message+="Ville : "+city+"%0A"
message+="Adresse : "+address+"%0A%0A"

message+="Produits : %0A"

cart.forEach(p=>{
message+="- "+p.name+" ("+p.price+"Fcfa)%0A"
})

message+="%0ATotal : "+total+"Fcfa"

let numero="24166366683"

let url="https://wa.me/+24166366683"+numero+"?text="+message

window.open(url)

}




function generateInvoice(order){

let text="FACTURE ER BOUTIQUE\n\n"

text+="Client : "+order.name+"\n"

text+="Ville : "+order.city+"\n"

text+="Date : "+order.date+"\n\n"

order.cart.forEach(p=>{

text+=p.name+" - "+p.price+"Fcfa\n"

})

text+="\nTotal : "+order.total+"Fcfa"

alert(text)

}



function loginAdmin(){

let pass=document.getElementById("adminPass").value

if(pass===adminPassword){

document.getElementById("adminPanel").style.display="block"

loadDashboard()

showOrders()

}

else{

alert("Mot de passe incorrect")

}

}



function addProduct(){

let name=document.getElementById("name").value

let price=parseFloat(document.getElementById("price").value)

let stock=parseInt(document.getElementById("stock").value)

let image=document.getElementById("image").value

products.push({name,price,stock,image})

renderProducts()

loadDashboard()

}



function showOrders(){

let list=document.getElementById("orders")

list.innerHTML=""

orders.forEach(o=>{

let li=document.createElement("li")

li.textContent=o.name+" | "+o.city+" | "+o.total+"€"

list.appendChild(li)

})

}



function loadDashboard(){

document.getElementById("totalProducts").textContent=products.length

document.getElementById("totalOrders").textContent=orders.length

}



renderProducts()