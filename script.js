// ================================
// IMAGE DATA
// ================================

const images = [

{
    title: "Mountain View",
    category: "nature",
    image: "assets/images/nature1.jpg"
},

{
    title: "Forest",
    category: "nature",
    image: "assets/images/nature2.jpg"
},

{
    title: "Beach",
    category: "travel",
    image: "assets/images/travel1.jpg"
},

{
    title: "City Skyline",
    category: "architecture",
    image: "assets/images/city1.jpg"
},

{
    title: "Bridge",
    category: "architecture",
    image: "assets/images/city2.jpg"
},

{
    title: "Pizza",
    category: "food",
    image: "assets/images/food1.jpg"
},

{
    title: "Burger",
    category: "food",
    image: "assets/images/food2.jpg"
},

{
    title: "Waterfall",
    category: "nature",
    image: "assets/images/nature3.jpg"
},

{
    title: "Desert",
    category: "travel",
    image: "assets/images/travel2.jpg"
},

{
    title: "Temple",
    category: "architecture",
    image: "assets/images/city3.jpg"
}

];

// ================================
// DOM
// ================================

const gallery = document.querySelector("#gallery");
const searchInput = document.querySelector("#searchInput");
const filters = document.querySelectorAll(".filter");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const caption = document.querySelector("#caption");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const darkBtn = document.querySelector("#darkmode-btn");
const icon = darkBtn.querySelector("i");

// ================================

let filteredImages = [...images];
let currentIndex = 0;

// ================================
// DISPLAY IMAGES
// ================================

function displayGallery(data){

gallery.innerHTML = "";

data.forEach((img,index)=>{

gallery.innerHTML += `

<div class="card" data-index="${index}">

<img src="${img.image}" alt="${img.title}" loading="lazy">

<div class="card-content">

<h3>${img.title}</h3>

<p>${img.category}</p>

</div>

</div>

`;

});

addCardEvents();

}

displayGallery(filteredImages);

// ================================
// OPEN LIGHTBOX
// ================================

function addCardEvents(){

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("click",()=>{

currentIndex = Number(card.dataset.index);

showImage();

});

});

}

// ================================

function showImage(){

lightbox.classList.add("show");

lightboxImage.src = filteredImages[currentIndex].image;

caption.textContent = filteredImages[currentIndex].title;

}

// ================================
// CLOSE
// ================================

closeBtn.addEventListener("click",()=>{

lightbox.classList.remove("show");

});

// ================================
// NEXT
// ================================

nextBtn.addEventListener("click",()=>{

currentIndex++;

if(currentIndex>=filteredImages.length){

currentIndex=0;

}

showImage();

});

// ================================
// PREVIOUS
// ================================

prevBtn.addEventListener("click",()=>{

currentIndex--;

if(currentIndex<0){

currentIndex=filteredImages.length-1;

}

showImage();

});

// ================================
// KEYBOARD
// ================================

document.addEventListener("keydown",(e)=>{

if(!lightbox.classList.contains("show")) return;

if(e.key==="ArrowRight"){

nextBtn.click();

}

if(e.key==="ArrowLeft"){

prevBtn.click();

}

if(e.key==="Escape"){

closeBtn.click();

}

});

// ================================
// SEARCH
// ================================

searchInput.addEventListener("keyup",()=>{

const value = searchInput.value.toLowerCase();

filteredImages = images.filter(img=>{

return img.title.toLowerCase().includes(value);

});

displayGallery(filteredImages);

});

// ================================
// CATEGORY FILTER
// ================================

filters.forEach(button=>{

button.addEventListener("click",()=>{

filters.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const category = button.dataset.filter;

if(category==="all"){

filteredImages=[...images];

}

else{

filteredImages=images.filter(img=>{

return img.category===category;

});

}

displayGallery(filteredImages);

});

});

// ================================
// DARK MODE
// ================================

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
} else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
}

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});