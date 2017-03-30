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
showAfterTaskName.addEventListener("click", function(event){
     ul.innerHTML = "";
  console.log("du klickade på" + showAfterTaskName);  
    firebase.database().ref('tasks/').orderByChild('name').on('value', function(snapshot) {

	snapshot.forEach( child => {
		let lastTask = child.val();  // objekten kommer i ordning
         let li = document.createElement("li");
			li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`;
           console.log("nyckeln: " + child.key);
            ul.appendChild(li);
	})
});
}) 

   
 /****sortera efter deadline*****/       
showDeadline.addEventListener("click", function(event){
     ul.innerHTML = "";
  console.log("du klickade på" + showDeadline);  
    firebase.database().ref('tasks/').orderByChild('deadline').on('value', function(snapshot) {

	snapshot.forEach( child => {
		let lastTask = child.val();  // objekten kommer i ordning
         let li = document.createElement("li");
			li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`;
           console.log("nyckeln: " + child.key);
            ul.appendChild(li);
	})
});
}) 
    
    
 /****när väljer färdiga i menyn*****/       
showCompleted.addEventListener("click", function(event){
    
  console.log("du klickade på" + showCompleted);  
}) 


 /****när väljer senast addade i menyn*****/       
showLastAdded.addEventListener("click", function(event){
    ul.innerHTML = "";
      console.log("du klickade på" + showLastAdded); 
    firebase.database().ref('tasks/').orderByChild('added').on('value', function(snapshot) {
	snapshot.forEach( child => {
		let lastTask = child.val();  // objekten kommer i ordning
         let li = document.createElement("li");
			li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`;
           console.log("nyckeln: " + child.key);
            ul.appendChild(li);
	})
});
})




 /**** visa så många i listan *****/       
showThisManyBtn.addEventListener("click", function(event){
    
    ul.innerHTML = "";
     let writtenNumberToShow = Number(inputNumberToShow.value);
      console.log("du klickade på" + showThisManyBtn, 'writtenNumberToShow är ' + writtenNumberToShow); 
    if (writtenNumberToShow == NaN){
        window.alert("That's not a number! Try again!");
    } else {
    firebase.database().ref('tasks/').orderByChild('added').limitToFirst(writtenNumberToShow).on('value', function(snapshot) {
	snapshot.forEach( child => {
		let lastTask = child.val();  // objekten kommer i ordning
         let li = document.createElement("li");
			li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`;
           console.log("nyckeln: " + child.key);
            ul.appendChild(li);
	})
});
        }
})




/*** välj hur många som ska visas       
showThisManyBtn.addEventListener("click", function(event){
    ul.innerHTML = "";
    let writtenNumberToShow = inputNumberToShow.value;
    
      console.log("du klickade på" + showThisManyBtn); 
    firebase.database().ref('dinosaurs').orderByChild('added').limitToFirst(writtenNumberToShow) {
	snapshot.forEach( child => {
		let lastTask = child.val();  // objekten kommer i ordning
         let li = document.createElement("li");
			li.innerHTML = `${lastTask.name} ${lastTask.deadline} ${lastTask.added} <input type="checkbox" id="${child.key}">`;
           console.log("nyckeln: " + child.key);
            ul.appendChild(li);
	})
});
})

***/ 


 /****när väljer ej färdiga i menyn*****/       
showNotComleted.addEventListener("click", function(event){
    console.log("du klickade på" + showNotComleted); 
}) 
    

 /****när man klickar på knappen*****/   
    
addTaskBtn.addEventListener("click", function(event){
  ul.innerHTML = "";
    writtenTaskName = inputTask.value;
    writtenDeadline = inputDate.value;
    
    
    let task = {  
	name: writtenTaskName,
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
	   snapshot.forEach( child => {
		let lastTask = child.val();  // objekten kommer i ordning
        //let lastTask = allTasks[task];
        
        
        let li = document.createElement("li");
			li.innerHTML = `<b>Task: </b>${lastTask.name}<br><b>Deadline: </b> ${lastTask.deadline}<br><b>Task added: </b> ${lastTask.added}`;
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