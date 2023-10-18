document.addEventListener("DOMContentLoaded", function () {
	// store all themes as an array of objects
	var themes = [
		{
			type: "blue",
			name: "Blue",
			plate: "text-[rgb(13,110,253)]",
			svgcolor: "",
			card: "text-white bg-[rgb(13,110,253)]",
			button: "border-[rgb(13,110,253)] hover:bg-[rgb(13,110,253)] hover:text-white"
		},
		{
			type: "dark",
			name: "Dark",
			plate: "bg-[rgb(33,37,41)] text-white",
			svgcolor: "text-[rgb(13,202,240)]",
			card: "text-white bg-[rgb(13,202,240)]",
			button: "hover:text-[rgb(33,37,41)] hover:bg-white"
		},
		{
			type: "red",
			name: "Red",
			plate: "text-[rgb(220,53,69)]",
			svgcolor: "",
			card: "text-white bg-[rgb(220,53,69)]",
			button: "border-[rgb(220,53,69)] hover:bg-[rgb(220,53,69)] hover:text-white"
		}
	];
	// to keep current theme, set an empty object first
	var theme = {};
	// get user's setting
	var user_setting = themes[0].type; // localStorage.getItem("theme")

	// a function to change current theme
	function handleTheme(type) {
		// if don't get the parameter, will automatically get from user's setting
		if (typeof type === "undefined") {
			type = user_setting;
		}
		// find the theme in themes variable
		var filtered = themes.filter(function (item) {
			return item.type === type;
		});
		// get the actual existing theme
		if (filtered.length >= 1) {
			theme = filtered[0];
		} else {
			theme = themes[0];
		}

		// do stuff change class name
		elements_plate.forEach(function (element) {
			element[0].className = element[1] + " " + theme.plate;
		});
		elements_svgcolor.forEach(function (element) {
			element[0].className = element[1] + " " + theme.svgcolor;
		});
		elements_card.forEach(function (element) {
			element[0].className = element[1] + " " + theme.card;
		});
		elements_button.forEach(function (element) {
			element[0].className = element[1] + " " + theme.button;
		});

		// save to user's setting
		// localStorage.setItem("theme", theme.type)
	}

	// get elements and get original class name ready to change
	var elements_plate = Array.from(
		document.querySelectorAll("[data-theme=plate]")
	).map(function (element) {
		return [element, element.className];
	});
	var elements_svgcolor = Array.from(
		document.querySelectorAll("[data-theme=svgcolor]")
	).map(function (element) {
		return [element, element.className];
	});
	var elements_card = Array.from(
		document.querySelectorAll("[data-theme=card]")
	).map(function (element) {
		return [element, element.className];
	});
	var elements_button = Array.from(
		document.querySelectorAll("[data-theme=button]")
	).map(function (element) {
		return [element, element.className];
	});

	// get the element for an user to interact to change the theme
	var element_setting = document.getElementById("setting");

	// do stuff when this website loads or an user opens this website
	// run the function when this website is opening
	handleTheme();

	// build options to the element for an user to select
	themes.forEach(function (item) {
		var node_option = document.createElement("option");
		node_option.value = item.type;
		node_option.text = item.name;

		element_setting.appendChild(node_option);
	});

	// automatically select the current theme
	element_setting.value = theme.type;

	// automatically resize as much as themes you have
	element_setting.size = themes.length;

	// set the function to run when an user changes the theme
	element_setting.addEventListener("change", function (event) {
		handleTheme(event.currentTarget.value);
	});
});