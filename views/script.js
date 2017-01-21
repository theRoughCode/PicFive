(function(){
	var content = document.getElementById('content');
	var html = '';
	var data = {
		temp: "Mr. goose"
	};

	var template = Handlebars.compile(document.getElementById('header-template').innerHTML);
	content.innerHTML = template(data);

})();
