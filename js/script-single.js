//		hent og gem variabel fra URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let tilbagesortering = urlParams.get("tilbagesortering");
console.log(id);
console.log(tilbagesortering);

//		globale værdier - katagoriFilter til "alle"
let menu;
let dest = document.querySelector(".data-container");
let kategoriFilter = "alle";

//		check for tilbagesortering og vælg denne
if (tilbagesortering != null) {
	kategoriFilter = tilbagesortering;
} else {
	kategoriFilter = "alle";
};

//		dokument DOM loadet
document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
	console.log("hentJson");
	//		Hent liste og læg til variablen personer
	let myJson = await fetch("json/menu.json");
	menu = await myJson.json();
	//		test json-import
	console.log(menu);
	//		Gå vis-funktion
	visMenuItem();
}

//		eventlistner for knapper, som sætter civilFilter til de valgte
document.querySelectorAll(".menu-knap").forEach(knap => {

	knap.addEventListener("click", filtrering)
});

//		filtrering function

function filtrering() {
	dest.textContent = "";
	kategoriFilter = this.getAttribute("data-kategori");
	visMenu();
}

function visMenuItem() {
	console.log("visMenu");

	//		Kør loop
	menu.forEach(menuitem => {
		let dest = document.querySelector(".data-container");

		//hvis id navn matcher, så kør loop
		if (menuitem.id == id) {

			//indsæt data i klonen

			//check skærmbredde og vælg billedstørrelse
			if (window.innerWidth >= 400) {
				dest.querySelector("img").src = "img/medium/" + menuitem.billede + "-md.jpg";
			} else {
				dest.querySelector("img").src = "img/small/" + menuitem.billede + "-sm.jpg";
			}

			dest.querySelector("img").alt = menuitem.kortbeskrivelse;
			dest.querySelector(".data-kategori").textContent = menuitem.kategori;
			dest.querySelector("h3").textContent = menuitem.navn;
			dest.querySelector(".data-langbeskrivelse").textContent = menuitem.langbeskrivelse;
			dest.querySelector(".data-pris").textContent = menuitem.pris + ",-";
			dest.querySelector(".data-oprindelsesregion").innerHTML = "<span class='bold'>Oprindelsesregion:</span> " + menuitem.oprindelsesregion;

			//udskift lang med kort beskrivelse hvis den mangler
			if (menuitem.langbeskrivelse == null) {
				dest.querySelector(".data-langbeskrivelse").textContent = menuitem.kortbeskrivelse;
			}

			// skjul oprindelsesregion hvis den mangler
			if (menuitem.oprindelsesregion == null) {
				dest.querySelector(".data-oprindelsesregion").classList.add("skjul");
			}
		}
	})
}

//eventlistner for tilbageknap
document.querySelector(".tilbage").addEventListener("click", gaaTilbage);

//går tilbage til index med sortering som variabel
function gaaTilbage() {
	window.location.href = "index.html?tilbagesortering=" + tilbagesortering + "#menu";
	console.log(tilbagesortering);
}

//		nav-menu-mobile

document.addEventListener("DOMContentLoaded", function (event) {
	navMenu();
});

function navMenu() {

	console.log("navMenu");

	function toggleMenu() {
		console.log("toggleMenu");
		document.querySelector(".burger").classList.toggle("change");
		document.querySelector("nav").classList.toggle("show");
		document.querySelector(".logo").classList.toggle("hide");
		document.querySelector(".darkwrapper").classList.toggle("high");
		document.querySelector(".burger").classList.toggle("pulse");
	}

	function closeMenu() {
		console.log("closeMenu");
		document.querySelector(".burger").classList.remove("change");
		document.querySelector("nav").classList.remove("show");
		document.querySelector(".logo").classList.remove("hide");
		document.querySelector(".darkwrapper").classList.remove("high");
		document.querySelector(".burger").classList.remove("pulse");
	}
	document.querySelector(".burger").addEventListener("click", toggleMenu);
	document.querySelector("nav ul").addEventListener("click", toggleMenu);
	document.querySelector("nav ul").addEventListener("mouseleave", closeMenu);
}
