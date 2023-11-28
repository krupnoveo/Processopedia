"use strict"
function menuWindow() {
	let hiddenMenuBtn = document.querySelector(".hiddenMenuButton");
	let mobileNavMenu = document.querySelector(".mobileNavMenuContainer");
	let scrollArea = document.querySelector(".scroll-area");
	let hiddenMenuImg = document.querySelector("#hiddenMenuImg");
	let searchImg = document.querySelector("#searchContainer");
	let main = document.querySelector("main");
	let clicked1 = false;
	hiddenMenuBtn.addEventListener("click", function() {
		if (!clicked1) {
			mobileNavMenu.style.zIndex = "3";
			mobileNavMenu.style.opacity = "1";
			scrollArea.style.height = "100vh";
			if (document.location.pathname.slice(-1) === "/") {
				hiddenMenuImg.setAttribute("src", "./images/cross.svg");
			} else {
				hiddenMenuImg.setAttribute("src", "../images/cross.svg");
			}
			searchImg.style.opacity = "0";
			searchImg.style.zIndex = "-1";
			main.style.transform = `scale(calc(${1.0 - (30/main.offsetHeight)}))`;
		} else {
			mobileNavMenu.style.zIndex = "-1";
			mobileNavMenu.style.opacity = "0";
			scrollArea.style.height = "100%";
			if (document.location.pathname.slice(-1) === "/") {
				hiddenMenuImg.setAttribute("src", "./images/hamburger-menu(2).svg");
			} else {
				hiddenMenuImg.setAttribute("src", "../images/hamburger-menu(2).svg");
			}
			searchImg.style.opacity = "1";
			searchImg.style.zIndex = "1";
			main.style.transform =  "scale(1.0)";
		}
		clicked1 = !clicked1;
	})
	window.addEventListener('resize', function(event) {
		if (this.document.body.clientWidth > 909) {
			clicked1 = false;
			mobileNavMenu.style.zIndex = "-1";
			mobileNavMenu.style.opacity = "0";
			scrollArea.style.height = "100%";
			if (document.location.pathname.slice(-1) === "/") {
				hiddenMenuImg.setAttribute("src", "./images/hamburger-menu(2).svg");
			} else {
				hiddenMenuImg.setAttribute("src", "../images/hamburger-menu(2).svg");
			}
			searchImg.style.opacity = "1";
			searchImg.style.zIndex = "1";
			main.style.transform =  "scale(1.0)";
		}
  }, true);
}

function searchWindow() {
	let searchWindow = document.querySelector("#searchWindow");
	let searchField = document.querySelector(".searchFieldContainer");
	let scrollArea = document.querySelector(".scroll-area");
	let clicked2 = false;
	let hiddenMenuImg = document.querySelector(".hiddenMenuButton");
	let main = document.querySelector("main");
	searchImg.addEventListener("click", function() {
		if (!clicked2) {
			searchWindow.style.zIndex = "3";
			searchWindow.style.opacity = "1";
			scrollArea.style.height = "100vh";
			hiddenMenuImg.style.opacity = "0";
			hiddenMenuImg.style.zIndex = "-1";
			if (document.location.pathname.slice(-1) === "/") {
				searchImg.setAttribute("src", "./images/cross.svg");
			} else {
				searchImg.setAttribute("src", "../images/cross.svg");
			}
			searchField.classList.add('searchFieldContainerAnimation');
			main.style.transform = `scale(calc(${1.0 - (30/main.offsetHeight)}))`;
		} else {
			searchWindow.style.zIndex = "-1";
			searchWindow.style.opacity = "0";
			scrollArea.style.height = "100%";
			hiddenMenuImg.style.opacity = "1";
			hiddenMenuImg.style.zIndex = "1";
			if (document.location.pathname.slice(-1) === "/") {
				searchImg.setAttribute("src", "./images/search.svg");
			} else {
				searchImg.setAttribute("src", "../images/search.svg");
			}
			searchField.classList.remove('searchFieldContainerAnimation');
			main.style.transform = "scale(1.0)";
		}
		clicked2 = !clicked2;
	})
	window.addEventListener('resize', function(event) {
		if (clicked2) {
			scrollArea.style.height = "100vh";
		}
	})
}
document.addEventListener("DOMContentLoaded", function() {
	menuWindow();
	searchWindow();
});