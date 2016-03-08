//add content when page loads
document.addEventListener('DOMContentLoaded', bindButtons);
// bind the button

function bindButtons(){
	//gather parameters into json object
	document.getElementById("loginButton").addEventListener('click',function(event){
		var req = new XMLHttpRequest();
		var stateReq = new XMLHttpRequest();
		var fedReq = new XMLHttpRequest();
		var payload = {username:null, password:null, InputType:null}
		payload.username= document.getElementById("username").value;
		payload.password= document.getElementById("password").value;
		payload.InputType= "Login";
		
	
		//validation user has filled in fields
		var fillStatus =0; 
		
		if(payload.username == ""){
			alert("Please Fill out Username");
			fillStatus=1;
		}
		
		else if(payload.password == ""){
			alert("Please Fill out Password");
			fillStatus=1;
		}
		
		//send request if status is 0
		if(fillStatus ==0){
			
			req.open('POST', 'ProcessRequest.php', false);
			req.setRequestHeader('Content-Type', 'application/json');
			req.send(JSON.stringify(payload));
			var response = req.responseText; 
			if(response == 0){
				alert("Your password or username was incorrect.");
			}
			else{
				console.log(response);
				alert("Your login was a success");
				var getid = response;
				console.log(getid);
				console.log(window.location.href);


			/*	// Not so fancy get request
				var place = window.location.href;
				place +="?id=";
				place +=getid;
				window.location = place;*/
				
				// Fancy calls
				var data = {InputType:'getLatLng', id: getid};
				redirectGet(data);
			}
		}
		else{
			alert ("You Suck");
		}
	event.preventDefault();	
	});
}


function redirectGet(params) {
	var form = document.createElement("form");
	form.setAttribute("method", "get");
	form.setAttribute("action", "home.php");
	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);
	form.submit();	
}
/*
function goToHomePage() {
	window.location = './home.php';
}
*/	
	
	
	
	