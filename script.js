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

			document.querySelector("#menu .content .filter-header").textContent = kategoriFilter;
		}

		document.addEventListener("DOMContentLoaded", function (event) {
			navMenu();
		});

		//		nav-menu"

		function navMenu() {

			console.log("navMenu");

			if (window.innerWidth <= 768) {

				function toggleMenu() {
					console.log("toggleMenu");
					document.querySelector(".burger").classList.toggle("change");
					document.querySelector("nav").classList.toggle("show");
					document.querySelector(".logo").classList.toggle("hide");
					document.querySelector(".darkwrapper").classList.toggle("high");
				}

				function closeMenu() {
					console.log("closeMenu");
					document.querySelector(".burger").classList.remove("change");
					document.querySelector("nav").classList.remove("show");
					document.querySelector(".logo").classList.remove("hide");
					document.querySelector(".darkwrapper").classList.remove("high");
				}
				document.querySelector(".burger").addEventListener("click", toggleMenu);
				document.querySelector("nav ul").addEventListener("click", toggleMenu);
				document.querySelector("nav ul").addEventListener("mouseleave", closeMenu);
			}
		}
