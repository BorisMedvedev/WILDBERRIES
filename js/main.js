//swiper
(function () {
  const mySwiper = new Swiper(".swiper-container", {
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
  });
})();

//modal
(function () {
  const buttonCart = document.querySelector(".button-cart");
  const modalCart = document.querySelector(".overlay");
  const modalClose = document.querySelector(".modal-close");

  buttonCart.addEventListener("click", () => {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
    document.body.style.paddingRight = paddingOffset;
    modalCart.classList.add("show");
    //document.body.style.overflow = "hidden";
  });

  document.addEventListener("click", (e) => {
    if (e.target === modalCart || e.target === modalClose) {
      modalCart.classList.remove("show");
      //document.body.style.overflow = "auto";
    }
  });
})();

//top button
(function () {
  const scrollLinks = document.querySelectorAll(".scroll-link");
  scrollLinks.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const id = el.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
})();

const more = document.querySelector(".more");
const navigationLink = document.querySelectorAll(".navigation-link");
const longGoodsList = document.querySelector(".long-goods-list");

async function getGoods() {
  const resault = await fetch("./db/db.json");
  if (!resault.ok) {
    throw "ERROR" + resault.status;
  }
  return await resault.json();
}

function createCard(objcard) {
  const card = document.createElement("article");
  card.className = "col-lg-3 col-sm-6";
  card.innerHTML = `
	<div class="goods-card">
	 ${objcard.label ? `<span class="label">${objcard.label}</span>` : ""}
			<img src="db/${objcard.img}" alt="${objcard.name}" class="goods-image">
					<h3 class="goods-title">${objcard.name}</h3>
						<p class="goods-description">${objcard.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${objcard.id}">
							<span class="button-price">$ ${objcard.price}</span>
						</button>
	</div>
	`;
  return card;
}

function renderCards(data) {
  longGoodsList.textContent = "";
  const cards = data.map(createCard);
  longGoodsList.append(...cards);
  document.body.classList.add("show-goods");
}

more.addEventListener("click", function (el) {
  el.preventDefault();
  getGoods().then(renderCards);
});

function filterCards(field, value) {
  getGoods()
    .then(function (data) {
      const filteredGoods = data.filter(function (good) {
        return good[field] === value;
      });
      return filteredGoods;
    })
    .then(renderCards);
}

navigationLink.forEach((link) => {
  link.addEventListener("click", (el) => {
    el.preventDefault();
    const field = link.dataset.field;
    const value = link.textContent;
    filterCards(field, value);
  });
});

const allCards = document.querySelector(".all-cards");
allCards.addEventListener("click", function (el) {
  el.preventDefault();
  getGoods().then(renderCards);
});
