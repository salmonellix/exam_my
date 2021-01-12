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
                            <span class="title"> Title: ${list[i].title}</span>
                            <span id ="description" " class="description"> Description: ${list[i].description}</span>
                            <span class="location"> Location: ${list[i].location}</span>
                            <span class="id_e"> ID: ${list[i].id_exam}</span>


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


					editBtn.addEventListener('click', (function(item){
						return function(){
							editItem(item)
						}
					})(list[i]))


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
			document.getElementById('description').value = activeItem.description
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

		var form = document.getElementById('form-wrapper')
		form.addEventListener('submit', function(e){
			e.preventDefault()
			console.log('Form submitted')
			var url = 'http://127.0.0.1:8000/front/exam-create/'
			if (activeItem != null){
				var url = `http://127.0.0.1:8000/front/exam-update/${activeItem.id_exam}/`
				console.log(url)
				activeItem = null
			}

			var title = document.getElementById('title').value
			var description = document.getElementById('description').value
			var location = document.getElementById('location').value
			// var id_s = document.getElementById('id_s').value
			var id_s = []
			var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
			for (var i = 0; i < checkboxes.length; i++) {
			  id_s.push(parseInt(checkboxes[i].value))
			}
			// var id_s = document.querySelector('.checkbox:checked').value;
			console.log(id_s)
			fetch(url, {
				method:'POST',
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				},
				body:JSON.stringify({'title':title, 'description': description, 'location': location, 'student_id': id_s})
			}

			).then(function(response){
				clearAll()
				buildList()
				document.getElementById('form').reset()
			})
		})



function buildListStudents(){
			clearAll()
			var wrapper = document.getElementById('list-wrapper');
			//wrapper.innerHTML = ''
			var url = 'http://127.0.0.1:8000/exam/';
			var id_student = document.getElementById('id_student').value;
			var url2 = 'http://127.0.0.1:8000/students/?search=' + id_student;
			var sid = 0
			console.log(url2);
			fetch(url2)
			.then((resp) => resp.json())
			.then(function(data){
				try{
					sid = data[0].id_user;
				}
				catch (e) {

				}
				


			})
			fetch(url)
			.then((resp) => resp.json())
			.then(function(data){
				console.log('Data:', data);

				var list = data;
				for (var i in list){
					console.log(list[i].student_id)
					if (list[i].student_id.includes(sid)){
						var item = `
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                            <div style="flex:7">
                            <span class="title"> Title: ${list[i].title}</span>
                            <span id ="description" " class="description"> Description: ${list[i].description}</span>
                            <span class="location"> Location: ${list[i].location}</span>
                            <span class="id_e"> ID: ${list[i].id_exam}</span>


                            </div>
                            <div style="flex:1">
                                <button onclick="window.location.href='${list[i].location}/'" class="btn open">OPEN </button>
                            </div>

						`
						wrapper.innerHTML += item

					}

								}
			})

		}


function buildListGrades(){
			var wrapper = document.getElementById('list-wrapper');
			//wrapper.innerHTML = ''

			var url = 'http://127.0.0.1:8000/grades/';
			// var url2 = 'http://127.0.0.1:8000/exam/';

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

function searchExamStudent() {
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
                            <span class="location"> Location: ${list[i].location}</span>                          
                            <span class=title"> ID: ${list[i].id_exam}</span>

                            </div>
                            <div style="flex:1">
                                <button onclick="window.location.href='${list[i].location}/'" class="btn open">OPEN </button>
                            </div>
                            </div>
                            </div>
						`
					wrapper.innerHTML += item
								}

			})}


function buildListStudentsPOST(){
			clearAll()
			var wrapper = document.getElementById('list-wrapper-students-POST');
			//wrapper.innerHTML = ''
			var url = 'http://127.0.0.1:8000/students/';
			fetch(url)
			.then((resp) => resp.json())
			.then(function(data){
				console.log('Data:', data);
				var list = data;
				for (var i in list){
						var item = `
                    <div id="data-row-check-${i}" class="task-wrapper flex-wrapper">
												<div class="checkbox" style="flex:7">
					 <label>
					 <input type="checkbox" name="student" value="${list[i].id_user}>
					</label>
                            <td class=title"> Name: ${list[i].first_name}</td>
                            <td class=title"> Last Name: ${list[i].last_name}</td>
                            <td class=title"> ID: ${list[i].username}</td>
                            </div>`
						wrapper.innerHTML += item
					}
			})

		}