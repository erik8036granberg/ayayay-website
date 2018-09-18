//		------------------------- Hvis vinduet er <= 768 px bredt  -------------------------

//		------------------------- SINGLE PAGE  -------------------------
//		------------------------- SINGLE PAGE  -------------------------
//		------------------------- SINGLE PAGE  -------------------------



if (window.innerWidth <= 768) {


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
		let kategoriFilter = "alle";
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

			//hvis id navn matcher, så udskriv
			if (menuitem.id == id) {


				//indsæt data i klonen
				dest.querySelector("img").src = "img/small/" + menuitem.billede + "-sm.jpg";
				dest.querySelector("img").alt = menuitem.kortbeskrivelse;
				dest.querySelector("img").addEventListener("click", () => {
					window.location.href = "index.html?id=" + menuitem.id + "&tilbagesortering=" + kategoriFilter;
				});
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


	document.querySelector(".tilbage").addEventListener("click", gaaTilbage);

	function gaaTilbage() {
		window.location.href = "index.html?tilbagesortering=" + tilbagesortering;
		console.log(tilbagesortering);
	}


	//		nav-menu-mobile

	document.addEventListener("DOMContentLoaded", function (event) {
		navMenu();
	});

	//	document.addEventListener("DOMContentLoaded", function (event) {
	//		filterMenu();
	//	});

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

	//	function filterMenu() {
	//
	//		console.log("filterMenu");
	//
	//		function showFilter() {
	//			console.log("showFilter");
	//			document.querySelector(".filter-darkwrapper").classList.add("show");
	//			document.querySelector(".filter-knap").classList.add("show");
	//			document.querySelector(".filter-darkwrapper .burger").classList.add("change");
	//			document.querySelector(".filter-darkwrapper .burger").classList.add("pulse");
	//		}
	//
	//		function hideFilter() {
	//			console.log("hideFilter");
	//			document.querySelector(".filter-darkwrapper").classList.remove("show");
	//			document.querySelector(".filter-knap").classList.remove("show");
	//			document.querySelector(".filter-darkwrapper .burger").classList.remove("change");
	//			document.querySelector(".filter-darkwrapper .burger").classList.remove("pulse");
	//		}
	//
	//		document.querySelector(".filter-menu-knap").addEventListener("click", showFilter);
	//		document.querySelector(".filter-darkwrapper ul").addEventListener("click", hideFilter);
	//		document.querySelector(".filter-darkwrapper ul").addEventListener("mouseleave", hideFilter);
	//		document.querySelector(".filter-darkwrapper .burger").addEventListener("click", hideFilter);
	//	}

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

				klon.querySelector("img").src = "img/small/" + menuitem.billede + "-sm.jpg";
				klon.querySelector("img").alt = menuitem.kortbeskrivelse;

				//indsætter eventlistner på article-class
				klon.querySelector(".menuitem").addEventListener("click", () => {
					visModal(menuitem);
				});

				klon.querySelector(".data-kategori").textContent = menuitem.kategori;
				klon.querySelector("h3").textContent = menuitem.titel;
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
				klon.querySelector("img").src = "img/medium/" + menuitem.billede + "-sm.jpg";
				klon.querySelector("img").alt = menuitem.kortbeskrivelse;

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
		modal.querySelector(".modal-navn").textContent = menuitemet.navn;
		modal.querySelector("img").src = "img/large/" + menuitemet.billede + ".jpg";
		modal.querySelector("img").alt = "Foto af " + menuitemet.billede;
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
