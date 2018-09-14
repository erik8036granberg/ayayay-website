function onLoad() {

	console.log("onLoad");

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

document.addEventListener("DOMContentLoaded", function (event) {
	onLoad();
});