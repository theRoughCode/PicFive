
$(function () {
  // Grab the template script
  var theTemplateScript = $("#address-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
    mainscore: "1000",
    winner1: "Mo",
    score1: "420",
    winner2: "Mo",
    score2: "420",
    winner3: "Mo",
    score3: "420",
    winner4: "Mo",
    score4: "420",
    winner5: "Mo",
    score5: "420",
    winner6: "Mo",
    score6: "420",
    winner7: "Mo",
    score7: "420",
    winner8: "Mo",
    score8: "420",
    winner9: "Mo",
    score9: "420",
    winner10: "Mo",
    score10: "420"
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
    $('.leaderboardData').html(theCompiledHtml);
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
