// html'den çağrılan elemanlar
var menuArea = document.querySelector('.menu-area');

// sayfanın yükleme anını izler
document.addEventListener('DOMContentLoaded', getMenu);

//! Menü
// ürünler verisini bütün fonksiyonlar erişebilecek
var globalMenu = [];

// ürün verilerini alır
function getMenu() {
  fetch('db.json')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      globalMenu = data;
      renderMenu(data.menu);
    })
    .catch(function (err) {
      console.log(err);
    })
};

// ürünleri ekran basıcak fonksiyon
function renderMenu(data) {
  // her bir ürün için html kartını diziye gönderir
  var menuHTML = data.map(function (item) {
    return `
       <div id="card">
        <img src="${item.img}" />
        <div class="card-info">
          <div class="name">
            <h3>${item.title}</h3>
            <p>$ ${item.price}</p>
          </div>
          <p class="desc">
            ${item.desc}
          </p>
        </div>
        <button onclick="sepeteEkle({ img:'${item.img}', name:'${item.title}', price:'${item.price}' })" class="cart-plus">
          <i class="bi bi-cart-plus"></i>
        </button>
      </div>`;
  });

  // diziyi stringe çevirme fonksiyonu
  menuHTML = menuHTML.join(' ');

  // htmle'e hazırladığımız kartları gönderme
  menuArea.innerHTML = menuHTML;
}

// bütün butonları çağırma
var buttons = document.querySelectorAll('.filter-btn');

// bütün butonlara olay izleyicisi ekleme
buttons.forEach(function (button) {
  button.addEventListener('click', filterCategory);
});

//  ürünleri filtreler
function filterCategory(e) {
  // butonun temsil ettiği kategoriyi alma
  var selected = e.target.dataset.category;

  // seçilen kategoriyle eşleşen bütün ürünleri alma
  var filtredMenu = globalMenu.menu.filter(function (item) {
    return item.category === selected;
  });

  if (selected === 'all') {
    // hepsi seçildiyse bütün menüyü ekrana bas
    renderMenu(globalMenu.menu);
  }
  else {
    // filtrlenmiş diziyi ekrana bas
    renderMenu(filtredMenu);
  }
}

//! Sepet
var cartShopping = document.querySelector(".cart-shopping");
var closeBtn = document.querySelector("#close");
var modal = document.querySelector(".modal");
var ModalBox = document.querySelector(".modal-box");

//! Fonksiyonlar
modal.addEventListener("click", sepettenCıkar);

// sepeti açacak fonksiyon
cartShopping.addEventListener("click", function () {
  ModalBox.classList.add("active");
});

// sepeti kapatacak fonksiyon
closeBtn.addEventListener("click", function () {
  ModalBox.classList.remove("active");
});

// sepete ekleme işlemini yapıyoruz!!!
function sepeteEkle(parametre) {
  const urunModal = document.createElement("div")
  urunModal.classList.add("urun-modal")
  urunModal.innerHTML = `
         <img src="${parametre.img}" alt="">
         <div class="info">
            <h3>${parametre.name}</h3>
            <p>$ ${parametre.price}</p>
         </div>
         <button  id="cart-dash">
            <i class="bi bi-cart-dash"></i>
         </button>
  `;

  modal.appendChild(urunModal);
}

// sepetten çıkarma işlemini yapıyoruz!!!
function sepettenCıkar(e) {
  const item = e.target

  console.log(item);

  if (e.target.id === "cart-dash") {
    item.parentElement.remove();
  }
}