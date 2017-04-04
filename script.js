window.addEventListener("load", function() {
    
    
	let showAfterListOrder = document.getElementById("listOrder");
	let showAfterTaskName = document.getElementById("listTaskName");
	let showLastAdded = document.getElementById("listLastAdded");
	let showCompleted = document.getElementById("listCompleted");
	let showNotComleted = document.getElementById("listNotComleted");
	let showDeadline = document.getElementById("showDeadline");
	let inputTask = document.getElementById("inputTask");
	let inputDate = document.getElementById("inputDate");
	let addTaskBtn = document.getElementById("addTaskBtn");
	let ul = document.getElementById("taskListUl");
	let inputNumberToShow = document.getElementById("inputNumberToShow");
	let showThisManyBtn = document.getElementById("showThisManyBtn");
	let writtenTaskName;
	let writtenDeadline;
	let key;
	let newTaskRef;
	firebase.database();
	
    
    /****sortera efter namn*****/
	showAfterTaskName.addEventListener("click", function(event) {
			ul.innerHTML = "";
			console.log("du klickade på" + showAfterTaskName);
			firebase.database().ref('tasks/').orderByChild('sortKeyNamesortKeyName').on('value', function(snapshot) {
				snapshot.forEach(child => {
					let lastTask = child.val(); // objekten kommer i ordning
					let li = document.createElement("li");
					li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`
					console.log("nyckeln: " + child.key);
					ul.appendChild(li);
				})
			});
		})
    
    /****sortera senast addade*****/
	showLastAdded.addEventListener("click", function(event) {
			ul.innerHTML = "";
			console.log("du klickade på" + showLastAdded);
			firebase.database().ref('tasks/').orderByChild('showLastAdded').on('value', function(snapshot) {
				snapshot.forEach(child => {
					let lastTask = child.val(); // objekten kommer i ordning
					let li = document.createElement("li");
					li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`
					console.log("nyckeln: " + child.key);
					//ul.appendChild(li);
					ul.insertBefore(li, ul.childNodes[0]);
				})
			});
		})
    
    
    /****sortera efter deadline*****/
	showDeadline.addEventListener("click", function(event) {
			ul.innerHTML = "";
			console.log("du klickade på" + showDeadline);
			firebase.database().ref('tasks/').orderByChild('deadline').on('value', function(snapshot) {
				snapshot.forEach(child => {
					let lastTask = child.val(); // objekten kommer i ordning
					let li = document.createElement("li");
					li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`
					console.log("nyckeln: " + child.key);
					ul.appendChild(li);
				})
			});
		})
    
    
    /**** visa så många i listan *****/
	showThisManyBtn.addEventListener("click", function(event) {
			ul.innerHTML = "";
			inputNumberToShow.innerHTML = "";
			let writtenNumberToShow = Number(inputNumberToShow.value);
			console.log("du klickade på" + showThisManyBtn, 'writtenNumberToShow är ' + writtenNumberToShow);
			if (isNaN(writtenNumberToShow)) {
				window.alert("That's not a number! Try again!");
				return false;
			} else {
				firebase.database().ref('tasks/').orderByChild('added').limitToFirst(writtenNumberToShow).on('value', function(snapshot) {
					snapshot.forEach(child => {
						let lastTask = child.val(); // objekten kommer i ordning
						let li = document.createElement("li");
						li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`
						console.log("nyckeln: " + child.key);
						ul.appendChild(li);
					})
				});
			}
		})
    
    
    /****när man klickar på spara*****/
	addTaskBtn.addEventListener("click", function(event) {
		ul.innerHTML = "";
		writtenTaskName = inputTask.value;
		writtenDeadline = inputDate.value;
		let task = {
			name: writtenTaskName,
			sortKeyName: writtenTaskName.toLocaleLowerCase(),
			deadline: writtenDeadline,
			added: currentTime()
		};
		newTaskRef = firebase.database().ref('tasks/').push(task);
		key = newTaskRef.key;
		console.log(key);
	});
    
    
	/******Hämta från databasen*******/
	ul.innerHTML = "";
	firebase.database().ref('tasks/').on('value', function(snapshot) {
		snapshot.forEach(child => {
			let lastTask = child.val(); // objekten kommer i ordning
			//let lastTask = allTasks[task];
			let li = document.createElement("li");
			li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`
			console.log("nyckeln: " + child.key);
			ul.appendChild(li);
		})
	});
    
    
	// hämta tid 
	function currentTime() {
		var currentDate = new Date();
		var time = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
		return time;
	}
    
    
});