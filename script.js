(function (){
	var content = document.getElementById('content');
	var html = '';
	var data = {
		title: "Welcome to PicFive!"
	};

	var template = Handlebars.compile(document.getElementById('header-template').innerHTML);
	content.innerHTML = template(data);

})();

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
});

function test() {
    alert("YO");
}

