//		------------------------- Hvis vinduet er <= 768 px bredt  -------------------------



if (window.innerWidth <= 768) {

	//		hent og gem variabel fra URL
	let urlParams = new URLSearchParams(window.location.search);
	let tilbagesortering = urlParams.get("tilbagesortering");
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

		//		Kør loop med json-data
		menu.forEach(menuitem => {
			//viser valgt filter eller alle
			if (menuitem.kategori == kategoriFilter || kategoriFilter == "alle") {

				let klon = temp.cloneNode(true).content;

				klon.querySelector(".data-kategori").textContent = menuitem.kategori;
				klon.querySelector("h3").textContent = menuitem.titel;
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
				klon.querySelector("img").src = "img/small/" + menuitem.billede + "-sm.jpg";
				klon.querySelector("img").alt = menuitem.kortbeskrivelse;
				klon.querySelector("img").addEventListener("click", () => {
					window.location.href = "single.html?id=" + menuitem.id + "&tilbagesortering=" + kategoriFilter;
				});
				//	    tilføj html DOM
				dest.appendChild(klon);
				console.log("loop er kørt");
			}
		})

		//		check kategori og tilføj endelse
		if (kategoriFilter == "alle") {
			kategoriFilter += " retter";
		} else if (kategoriFilter == "forret") {
			kategoriFilter += "ter";
		} else if (kategoriFilter == "hovedret") {
			kategoriFilter += "ter";
		} else {
			kategoriFilter += "er";
		};

		//		skriv filternavn i DOM
		document.querySelector("#menu .content .filter-header").textContent = kategoriFilter;
	}

	document.addEventListener("DOMContentLoaded", function (event) {
		navMenu();
	});

	document.addEventListener("DOMContentLoaded", function (event) {
		filterMenu();
	});


	//		nav-menu-mobile

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
				klon.querySelector("img").addEventListener("click", () => {
					visModal(menuitem);
				});

				klon.querySelector(".data-kategori").textContent = menuitem.kategori;
				klon.querySelector("h3").textContent = menuitem.titel;
				klon.querySelector(".data-kortbeskrivelse").textContent = menuitem.kortbeskrivelse;
				klon.querySelector(".data-pris").textContent = menuitem.pris + ",-";
				klon.querySelector("img").src = "img/small/" + menuitem.billede + "-sm.jpg";
				klon.querySelector("img").alt = menuitem.kortbeskrivelse;

				//	    tilføj html DOM
				dest.appendChild(klon);
				console.log("loop er kørt");
			}
		})

		//		check kategori og tilføj endelse
		if (kategoriFilter == "alle") {
			kategoriFilter += " retter";
		} else if (kategoriFilter == "forret") {
			kategoriFilter += "ter";
		} else if (kategoriFilter == "hovedret") {
			kategoriFilter += "ter";
		} else {
			kategoriFilter += "er";
		};

		document.querySelector("#menu .content .filter-header").textContent = kategoriFilter;
	}

	//	//viser modal ved at skite i css (opasity), og starter skjulModal
	//	function visModal(menuitemet) {
	//		modal.classList.add("vis");
	//		modal.querySelector("button").addEventListener("click", skjulModal);
	//		document.querySelector("#modal").addEventListener("click", skjulModal);
	//
	//		//hent data fra indlæst "post"
	//		modal.querySelector(".modal-navn").textContent = menuitemet.navn;
	//		modal.querySelector("img").src = "imgs/large/" + menuitemet.billede + ".jpg";
	//		modal.querySelector("img").alt = "Foto af " + menuitemet.billede;
	//		modal.querySelector(".modal-langbeskrivelse").textContent = menuitemet.langbeskrivelse;
	//		modal.querySelector(".modal-oprindelsesregion").innerHTML = "<span class='bold'>Oprindelsesregion:</span> " + menuitemet.oprindelsesregion;
	//		modal.querySelector(".modal-pris").textContent = menuitemet.pris + ",-";
	//
	//		//udskift lang med kort beskrivelse hvis den mangler
	//		if (menuitemet.langbeskrivelse == null) {
	//			modal.querySelector(".modal-langbeskrivelse").textContent = menuitemet.kortbeskrivelse;
	//		}
	//
	//		// skjul oprindelsesregion hvis den mangler
	//		if (menuitemet.oprindelsesregion == null) {
	//			modal.querySelector(".modal-oprindelsesregion").classList.add("skjul");
	//		}
	//	}
	//
	//	//skjuler modal ved slå css "vis" fra
	//	function skjulModal() {
	//		modal.classList.remove("vis");
	//		modal.querySelector(".modal-oprindelsesregion").removeEventListener("click", skjulModal)
	//	}

	//skjul lang beskrivelse


	//	if window.innerWidth slut
}
