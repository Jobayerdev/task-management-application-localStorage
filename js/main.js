let tasklist = [];

const getDay = document.getElementById("day");
const getFullDate = document.getElementById("full-date");
const getTaskList = document.querySelector(".task-list ul");

// Init Function
showDate(getDay, getFullDate);
showTaskList(tasklist);

// Date
function showDate(getdayName, getNowDate) {
	const d = new Date();
	const Dates = d.getDate();
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	const dayName = days[d.getDay()];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	const mounthName = months[d.getMonth()];
	const year = d.getFullYear();
	getdayName.innerText = dayName;
	getNowDate.innerText = Dates + " " + mounthName + " " + year;
}

//Get Input
function storeTaskList(filed) {
	const getInputField = document.getElementById(filed);
	const getInputFieldValue = getInputField.value;
	if (getInputFieldValue) {
		tasklist.push(getInputFieldValue);
	}
	getInputField.value = "";
	showTaskList(tasklist);
	return tasklist;
}

//Display TaskList
function showTaskList(taskItem) {
	const getLi = taskItem.map((x) => {
		const li = document.createElement("li");
		li.classList.add("item");
		li.innerHTML = `<span class="tick"><img src="history.svg"/> </span>
		<p>${x}</p>
						<span class="dele"><img src="delete.svg"/> </span>
					`;
		return li;
	});
	getLi.forEach((element) => {
		getTaskList.appendChild(element);
	});
	deleteIems(getLi);
	return getLi;
}

// delete
function deleteIems(listOfItems) {
	listOfItems.forEach((x) => {
		x.childNodes[4].addEventListener("click", function() {
			const getIndex = tasklist.indexOf(x.childNodes[0].innerText);
			tasklist.splice(getIndex, 1);
			getTaskList.innerHTML = "";
			showTaskList(tasklist);
			localStorage.setItem("tasklist", JSON.stringify(tasklist));
		});
	});
}
window.addEventListener("load", () => {
	const data = JSON.parse(localStorage.getItem("tasklist"));
	tasklist = [...data];
	showTaskList(tasklist);
});

const addBtn = document.querySelector(".btn-add");
addBtn.addEventListener("click", function(e) {
	storeTaskList("input");
	getTaskList.innerHTML = "";
	showTaskList(tasklist);
	localStorage.setItem("tasklist", JSON.stringify(tasklist));
});
