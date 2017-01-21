(function (){
	var content = document.getElementById('content');
	var html = '';
	var data = {
		title: "Welcome to PicFive!"
	};

	var template = Handlebars.compile(document.getElementById('header-template').innerHTML);
	content.innerHTML = template(data);

})();