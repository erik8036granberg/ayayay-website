//		------------------------- Hvis vinduet er <= 768 px bredt  -------------------------

//		------------------------- SINGLE PAGE  -------------------------
//		------------------------- SINGLE PAGE  -------------------------
//		------------------------- SINGLE PAGE  -------------------------



if (window.innerWidth <= 768) {

	//		hent og gem variabel fra URL
	let urlParams = new URLSearchParams(window.location.search);
	let tilbagesortering = urlParams.get("tilbagesortering");
	console.log(tilbagesortering);

	//		globale værdier - katagoriFilter til "alle"
	let menu;
	let dest = document.querySelector(".data-container");
	//	let kategoriFilter = "alle";

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
		visMenu()
	};

	//		eventlistner for knapper, som sætter civilFilter til dey valgte
	document.querySelectorAll(".menu-knap").forEach(knap => {

		knap.addEventListener("click", filtrering)
	});

	//		filtrering function

	function filtrering() {
		dest.textContent = "";
		kategoriFilter = this.getAttribute("data-kategori");
		visMenu();
	}

	function visMenu() {
		console.log("visMenu");
		//		Select modtager og template
		let temp = document.querySelector(".data-template");
		document.querySelector("#menu .content .filter-header").textContent = kategoriFilter;

		//		Kør loop med json-data
		menu.forEach(menuitem => {
			//viser valgt filter eller alle
			if (menuitem.kategori == kategoriFilter || kategoriFilter == "alle") {

				let klon = temp.cloneNode(true).content;

				//check skærmbredde og vælg billedstørrelse
				if (window.innerWidth >= 400) {
					klon.querySelector("img").src = "img/medium/" + menuitem.billede + "-md.jpg";
				} else {
					klon.querySelector("img").src = "img/small/" + menuitem.billede + "-sm.jpg";
				}

				klon.querySelector("img").alt = "Foto af " + menuitem.billede;
				klon.querySelector("img").addEventListener("click", () => {
					window.location.href = "single.html?id=" + menuitem.id + "&tilbagesortering=" + kategoriFilter;
				});
				klon.querySelector(".data-kategori").textContent = menuitem.kategori;
				klon.querySelector("h3").textContent = menuitem.navn;
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";

				//	    tilføj html DOM
				dest.appendChild(klon);
				console.log("loop er kørt");
			}
		})
	}


	//		nav-menu-mobile

	document.addEventListener("DOMContentLoaded", function (event) {
		navMenu();
	});

	document.addEventListener("DOMContentLoaded", function (event) {
		filterMenu();
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

	//		filter-menu-mobile

	function filterMenu() {

		console.log("filterMenu");

		function showFilter() {
			console.log("showFilter");
			document.querySelector(".filter-darkwrapper").classList.add("show");
			document.querySelector(".filter-knap").classList.add("show");
			document.querySelector(".filter-darkwrapper .burger").classList.add("change");
			document.querySelector(".filter-darkwrapper .burger").classList.add("pulse");
		}

		function hideFilter() {
			console.log("hideFilter");
			document.querySelector(".filter-darkwrapper").classList.remove("show");
			document.querySelector(".filter-knap").classList.remove("show");
			document.querySelector(".filter-darkwrapper .burger").classList.remove("change");
			document.querySelector(".filter-darkwrapper .burger").classList.remove("pulse");
		}

		document.querySelector(".filter-menu-knap").addEventListener("click", showFilter);
		document.querySelector(".filter-darkwrapper ul").addEventListener("click", hideFilter);
		document.querySelector(".filter-darkwrapper ul").addEventListener("mouseleave", hideFilter);
		document.querySelector(".filter-darkwrapper .burger").addEventListener("click", hideFilter);
	}

	//	if window.innerWidth slut
}



//		------------------------- Hvis vinduet er > 768 px bredt  -------------------------
//		------------------------- MODAL  -------------------------
//		------------------------- MODAL  -------------------------
//		------------------------- MODAL  -------------------------


if (window.innerWidth > 768) {


	//		globale værdier - katagoriFilter til "alle"
	let menu;
	let dest = document.querySelector(".data-container");
	let kategoriFilter = "alle";
	let modal = document.querySelector("#modal");

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
		visMenu();
	}

	//		eventlistner for knapper, som sætter civilFilter til dey valgte
	document.querySelectorAll(".menu-knap").forEach(knap => {

		knap.addEventListener("click", filtrering)
	});

	//		filtrering function

	function filtrering() {
		dest.textContent = "";
		kategoriFilter = this.getAttribute("data-kategori");
		visMenu();
	}

	function visMenu() {

		//		Select modtager og template
		let temp = document.querySelector(".data-template");
		console.log("visMenu");


		//		Kør loop med json-data
		menu.forEach(menuitem => {
			//viser valgt filter eller alle
			if (menuitem.kategori == kategoriFilter || kategoriFilter == "alle") {

				//		klon til template
				let klon = temp.cloneNode(true).content;

				klon.querySelector("img").src = "img/medium/" + menuitem.billede + "-md.jpg";
				klon.querySelector("img").alt = "Foto af " + menuitem.billede;

				//indsætter eventlistner på article-class
				klon.querySelector(".menuitem").addEventListener("click", () => {
					visModal(menuitem);
				});

				klon.querySelector(".data-kategori").textContent = menuitem.kategori;
				klon.querySelector("h3").textContent = menuitem.navn;
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";

				//	    tilføj html DOM
				dest.appendChild(klon);
				console.log("loop er kørt");
			}
		})

		document.querySelector("#menu .content .filter-header").textContent = kategoriFilter;
	}

	//viser modal ved at skite i css (opasity), og starter skjulModal
	function visModal(menuitemet) {
		modal.classList.add("vis");
		modal.querySelector("button").addEventListener("click", skjulModal);
		document.querySelector("#modal").addEventListener("click", skjulModal);

		//hent data fra indlæst "post"
		modal.querySelector("img").src = "img/medium/" + menuitemet.billede + "-md.jpg";
		modal.querySelector("img").alt = "Foto af " + menuitemet.billede;
		modal.querySelector(".modal-kategori").textContent = menuitemet.kategori;
		modal.querySelector(".modal-navn").textContent = menuitemet.navn;
		modal.querySelector(".modal-langbeskrivelse").textContent = menuitemet.langbeskrivelse;
		modal.querySelector(".modal-oprindelsesregion").innerHTML = "<span class='bold'>Oprindelsesregion:</span> " + menuitemet.oprindelsesregion;
		modal.querySelector(".modal-pris").textContent = menuitemet.pris + ",-";
	}

	//skjuler modal ved slå css "vis" fra
	function skjulModal() {
		modal.classList.remove("vis");
		modal.querySelector(".modal-oprindelsesregion").removeEventListener("click", skjulModal)
	}

	//	if window.innerWidth slut
}
