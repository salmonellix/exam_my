function getCookie(name) {
		    var cookieValue = null;
		    if (document.cookie && document.cookie !== '') {
		        var cookies = document.cookie.split(';');
		        for (var i = 0; i < cookies.length; i++) {
		            var cookie = cookies[i].trim();
		            // Does this cookie string begin with the name we want?
		            if (cookie.substring(0, name.length + 1) === (name + '=')) {
		                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                break;
		            }
		        }
		    }
		    return cookieValue;
		}
		var csrftoken = getCookie('csrftoken');

		var activeItem = null
		var list_snapshot = []


function buildList(){
			var wrapper = document.getElementById('list-wrapper');
			//wrapper.innerHTML = ''
			var url = 'http://127.0.0.1:8000/exam/';

			fetch(url)
			.then((resp) => resp.json())
			.then(function(data){
				console.log('Data:', data);

				var list = data;
				for (var i in list){
					var item = `
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                            <div style="flex:7">
                            <span class=title"> Title: ${list[i].title}</span>
                            <span class=title"> Description: ${list[i].description}</span>
                            <span class=title"> Location: ${list[i].location}</span>
                            <span class=title"> ID: ${list[i].id_exam}</span>


                            </div>
                            <div style="flex:1">
                                <button class="btn edit">EDIT </button>
                            </div>
                             <div style="flex:1">
                                <button class="btn delete" onclick="deleteItem(${list[i].id_exam})" >DELETE</button>
                            </div>
                             <div style="flex:1">
                                <button class="btn delete" onclick="window.location.href='http://127.0.0.1:8000/front/examslist/grades/${list[i].id_exam}/'">GRADES</button>
                            </div>
                            </div>
						`
					wrapper.innerHTML += item
								}
				for (var i in list){
					var editBtn = document.getElementsByClassName('edit')[i]
					var deleteBtn = document.getElementsByClassName('delete')[i]
					var title = document.getElementsByClassName('title')[i]


					// editBtn.addEventListener('click', (function(item){
					// 	return function(){
					// 		editItem(item)
					// 	}
					// })(list[i]))


					deleteBtn.addEventListener('click', (function(item){
						return function(){
							deleteItem(item)
						}
					})(list[i]))


					// title.addEventListener('click', (function(item){
					// 	return function(){
					// 		strikeUnstrike(item)
					// 	}
					// })(list[i]))


				}
			
			})}

		function editItem(item){
			console.log('Item clicked:', item)
			activeItem = item
			document.getElementById('title').value = activeItem.title
		}


		function deleteItem(item){
			console.log('Delete clicked')
			fetch(`http://127.0.0.1:8000/front/exam-delete/${item}/`, {
				method:'DELETE',
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				}
			}).then((response) => {
				clearAll()
				buildList()
			})
		}			
			
			
			
function buildListStudents(){
			var wrapper = document.getElementById('list-wrapper');
			//wrapper.innerHTML = ''



			var url = 'http://127.0.0.1:8000/students/';

			fetch(url)
			.then((resp) => resp.json())
			.then(function(data){
				console.log('Data:', data);

				var list = data;
				for (var i in list){
					var item = `
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                            <div style="flex:7">
                            <span class=title"> Name: ${list[i].first_name}</span>
                            <span class=title"> Last Name: ${list[i].last_name}</span>
                            <span class=title"> ID: ${list[i].id_user}</span>
                            <span class=title"> email: ${list[i].email}</span>
                            </div>
                            <div style="flex:1">
                                <button class="btn edit">EDIT  </button>
                            </div>
                             <div style="flex:1">
                                <button class="btn delete">DELETE</button>
                            </div>
                            </div>
						`
					wrapper.innerHTML += item

								}})}


function buildListGrades(){
			var wrapper = document.getElementById('list-wrapper');
			//wrapper.innerHTML = ''

			var url = 'http://127.0.0.1:8000/grades/';

			fetch(url)
			.then((resp) => resp.json())
			.then(function(data){
				console.log('Data:', data);

				var list = data;
				for (var i in list){
					var item = `
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                            <div style="flex:7">
                            <span class=title"> Student ID: ${list[i].student_id}</span>
                            <span class=title"> Exam ID: ${list[i].exam_id}</span>
                            <span class=title"> Grade: ${list[i].grade_number}</span>
                            </div>
                            <div style="flex:1">
                                <button class="btn edit">EDIT </button>
                            </div>
                             <div style="flex:1">
                                <button class="btn delete">DELETE</button>
                            </div>
                            </div>
						`
					wrapper.innerHTML += item

								}})}
								
								
function searchExam() {
var wrapper = document.getElementById('list-wrapper-search');
			//wrapper.innerHTML = ''
			var searchTXT = document.getElementById("search").value;
			var url = 'http://127.0.0.1:8000/exam/?search=' + searchTXT;

			fetch(url)
			.then((resp) => resp.json())
			.then(function(data){
				console.log('Data:', data);

				var list = data;
				for (var i in list){
					var item = `
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                            <div style="flex:7">
                            <span class=title"> Title: ${list[i].title}</span>
                            <span class=title"> Description: ${list[i].description}</span>
                            <span class=title"> Location: ${list[i].location}</span>
                            <span class=title"> ID: ${list[i].id_exam}</span>


                            </div>
                            <div style="flex:1">
                                <button class="btn edit">EDIT </button>
                            </div>
                             <div style="flex:1">
                                <button class="btn delete" onclick="deleteItem(${list[i].id_exam})" >DELETE</button>
                            </div>
                             <div style="flex:1">
                                <button class="btn delete" onclick="window.location.href='http://127.0.0.1:8000/front/examslist/grades/${list[i].id_exam}/'">GRADES</button>
                            </div>
                            </div>
                            </div>
						`
					wrapper.innerHTML += item
								}})}

function clearSearch() {
			var wrapper = document.getElementById('list-wrapper-search');
			wrapper.innerHTML = ''
	        document.getElementById('search').reset()
}


function clearAll() {
			var wrapper = document.getElementById('list-wrapper');
			wrapper.innerHTML = ''
	        // document.getElementById('search').reset()
}

function getGrades() {


}