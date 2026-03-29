
let cart=[]

let products=[
{
name:"Chemise Pro",
price:25,
stock:10,
image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10"
},
{
name:"Pantalon Pro",
price:40,
stock:8,
image:"https://images.unsplash.com/photo-1592878849122-5d55f0cba5c4"
}
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

<p>${p.price} €</p>

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

li.textContent=p.name+" - "+p.price+" €"

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

let order={

name,

phone,

city,

address,

cart,

total,

date:new Date().toLocaleDateString()

}

orders.push(order)

localStorage.setItem("orders",JSON.stringify(orders))

generateInvoice(order)

cart=[]

renderCart()

}



function generateInvoice(order){

let text="FACTURE ER BOUTIQUE\n\n"

text+="Client : "+order.name+"\n"

text+="Ville : "+order.city+"\n"

text+="Date : "+order.date+"\n\n"

order.cart.forEach(p=>{

text+=p.name+" - "+p.price+"€\n"

})

text+="\nTotal : "+order.total+"€"

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