const searchContainer = document.querySelector('.search-container')
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

/*seach all the suggestions that include input str*/
function search(str) {
	let results = [];

	//filtering array value and return only those fruits' name including user's input		
	results = fruit.filter((data) => {
		return data.toLowerCase().includes(str.toLowerCase());
	});

	//wrap reuslts in proper html tag
	results = results.map((data) => {
		let idx = data.toLowerCase().indexOf(str.toLowerCase())
		let len = str.length;
		let boldData = '<span>' + data.slice(idx, idx + len) + '</span>';
		return data = '<li>' + data.slice(0, idx) + boldData + data.slice(idx + len) + '</li>';
	});	
	return results;
}

/*When a user types, trigger an event */
function searchHandler(e) {
	let userData = e.target.value; //user entered data
    let suggArr = []; //storing all suggestions
	if(userData) {
		suggArr = search(userData);
		suggestions.classList.add("has-suggestions"); //show autocomplete box
	} else {
		suggestions.classList.remove("has-suggestions"); //hide autocomplete box
	}
	
	
	showSuggestions(suggArr, userData);
}

/*List all the suggestions under search bar */
function showSuggestions(results, inputVal) {
	let listData;
	if(!results.length) {
		listData = '<li>' + '<span>' + inputVal + '</span>' + '</li>';
	} else {
		listData = results.join('');
	}
	suggestions.innerHTML = listData;
}

/*When a user click a suggestion, it fills the search bar and all suggestions removed */
function useSuggestion(e) {
	input.value = e.target.innerText;//passing the user selected item to textfield
	removedSugg = document.querySelector(".has-suggestions");
	//remove all the suggestions
	while (removedSugg.hasChildNodes()) {
		removedSugg.removeChild(removedSugg.firstChild);
	}
	
	suggestions.classList.remove("has-suggestions");
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);