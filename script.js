(function(){
	var content = document.getElementById('content');
	var html = '';
	var data = {
		headerTitle: "Mr. goose"
	};

	var template = Handlebars.compile(document.getElementById('header-template').innerHTML);
	content.innerHTML = template(data);

})();