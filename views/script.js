
$(function () {
    $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 2500,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
  });
});
/*
(function (){
	var content = document.querySelector('content');
	var html = '';
	var data = {
		title: "Welcome to PicFive!"
	};

	var template = Handlebars.compile(document.querySelector('header-template').innerHTML);
	content.innerHTML = template(data);

})();

function test(msg) {
    alert(msg);
}*/
