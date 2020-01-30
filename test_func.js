function main(){
	$(document).ready(function(){
		$("#answer1").hide();
		$("#answer2").hide();
		$("#answer3").hide();
		$("#answer4").hide();
		$("#submit").hide();
		$("#guessesBadge").hide();
		$("#restart").hide();
	});
}

main()
var trys = 0;
var gameOn = false;

function randomColor(){
  var colors = ["red","blue","yellow","green","purple"];
  return colors[Math.floor(Math.random()*5)]
}

function newGame(){
	console.log("Starting new Game!");
	var star1Color = randomColor();
	var star2Color = randomColor();
	var star3Color = randomColor();
	var star4Color = randomColor();
	$("#answer1").show();
	$("#answer2").show();
	$("#answer3").show();
	$("#answer4").show();
	$("#submit").show();
	$("#guessesBadge").show();
	$("#restart").show();
	$("#NewGame").hide();
	colors = [star1Color,star2Color,star3Color,star4Color];
	
	gameOn = true;
}

function submit(){
	if (!gameOn)
	{
		alert("You must press the New Game Button!");
		return false;
	}
	if (trys == 9)
		{
			alert("Game Over :(");
			return false;
		}
	console.log("submitted!");
	var ans1 = document.getElementById("answer1");
	var ans2 = document.getElementById("answer2");
	var ans3 = document.getElementById("answer3");
	var ans4 = document.getElementById("answer4");
	var hits = 0;
	var misses = 0;
	var colorsCopy = [...colors];
	answers_list = [ans1.style.backgroundColor,ans2.style.backgroundColor,ans3.style.backgroundColor,ans4.style.backgroundColor];
	answersCopy = [...answers_list];
	var ans = 0;
	while (ans < answers_list.length)
	{
		if (answers_list[ans] == ""){alert("you must select all the colors!");return false};
		if (answers_list[ans] == colorsCopy[ans])
		{
			hits ++;
			answers_list.splice(ans,1);
			colorsCopy.splice(ans,1);
			ans --
		}

		ans ++
		
	}
	for (ans2 of answers_list)
	{
		if (colorsCopy.includes(ans2))
		{
			misses ++;
			colorsCopy.splice(colorsCopy.indexOf(ans2),1);
		}
	}
	console.log("You Have " + hits + " hits, and " + misses + " misses!")
	var trysDivs = document.querySelectorAll(".trysDivs");
	trysDivs[trys].innerHTML = createTryHTML(trysDivs[trys].innerHTML, answersCopy, hits, misses, trys)
	trys ++;

	if (hits == 4)
		{
			alert("Victory!")
			return true
		}
}

function createTryHTML(inner, colors, hits, misses, trys)
{
	console.log(colors)
	retval = ""
	for(color of colors)
	{
		retval += "<button class='btn' style='background-color:";
		retval += color;
		retval += "'>* </button> "
	}
	retval += ("<span class='badge badge-danger'>"+(hits)+"</span>");
	retval += ("<span class='badge badge-warning'>"+misses+"</span>");
	return "<h5><span class='guesses'>"+ (trys+1) + ":  </span>" + retval + "      </h5>"+inner;

}

function changeColor(num){
	var colors = ["red","blue","yellow","green","purple"];
	var but = document.getElementById("answer"+num);
	var colorIndex = colors.indexOf(but.style.backgroundColor);
	var newColor = colors[(colorIndex + 1)%5]
	//console.log("changing the color of button number "+num+" to "+newColor);
	but.style.backgroundColor = newColor;
}




