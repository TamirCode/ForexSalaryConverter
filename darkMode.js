const htmlElement = document.documentElement;
const toggleThemeBtn = document.createElement("button"); // will append this element to the document in script.js file because its after body loads

if (localStorage.getItem("isDark") === null) {
    localStorage.setItem("isDark", "false");
	toggleThemeBtn.innerText = "Dark Mode"
} else if (localStorage.getItem("isDark") == "true") {
	htmlElement.className = "dark";
	toggleThemeBtn.innerText = "Light Mode"
} else {
	htmlElement.className = "light";
	toggleThemeBtn.innerText = "Dark Mode"
}

toggleThemeBtn.addEventListener("click", () => {
	if (localStorage.getItem("isDark") == "false") {
		htmlElement.className = "dark";
		localStorage.setItem("isDark", "true");
		toggleThemeBtn.innerText = "Light Mode"
	} else {
		htmlElement.className = "light";
		localStorage.setItem("isDark", "false");
		toggleThemeBtn.innerText = "Dark Mode"
	}
});