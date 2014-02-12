var allQuestions = [
{
  question: "Select a true statment from the following:",
  selection: ["JavaScript is Java", "JavaScript is better before than it is now", "JavaScript is the only language that we should learn!", "JavaScript doesn't use classes in OOP, they use functions"],
  correctAnswer: 3
},
{
  question: "What are methods in objects?",
  selection: ["References", "Functions", "Properties", "this.name"],
  correctAnswer: 1
},
{
	question: "What are variables in objects?",
  selection: ["Properties", "Methods", "References", "Constructors"],
  correctAnswer: 0
},
{
  question: "Keyword to creating an object from a class is...?",
  selection: ["super", "object", "new", "class"],
  correctAnswer: 2
}
];

var quizApp = (function () {

	//Elements
	var questions, radioButton, results, option, next, back, optionButton;

	//User data
	var currentQuestion = 0;
	var correct = 0;
	var selections = [];

	//public functions
	var methods = {

		init: function () {
			questions = document.getElementById('questions');
			radioButton = document.getElementById('radioButton');
			results = document.getElementById('results');
			option = document.getElementById('option');
			optionButton = document.getElementById('optionButton');
			next = document.getElementById('next');
			back = document.getElementById('back');
			methods.displayQuestion();
			methods.eventFunctions();
		},

		eventFunctions: function () {
			next.addEventListener("click", function (){
				var answer = document.getElementsByName('choices');
				var checker = 0;

				for(var i = 0; i < answer.length; i++){
					if(answer[i].checked){
						checker--;
					} else {
						checker++;
					}
				};

				if (checker == 4) {
					alert("Please select an answer.")
				} else {
					methods.showNext();
				};

			});

			back.addEventListener("click", function (){
				methods.showPrevious();
			});

			optionButton.addEventListener("click", function(){
				methods.reDo();
			});

		},

		displayQuestion: function () {
			questions.innerHTML = allQuestions[currentQuestion].question;

			var buttons = "";
			for (var i = 0; i < allQuestions[currentQuestion].selection.length; i++) {
				buttons += "<input type='radio' name='choices' value='" + i + "'/>" + allQuestions[currentQuestion].selection[i] + "<br/>";
			}

			radioButton.innerHTML = buttons;

			next.innerHTML = "<input type='button' name='next' value='Next'/>";

			if (currentQuestion == 0) {
				back.innerHTML = "";
			} else {
				back.innerHTML = "<input type='button' name='back' value='Back'/>";
			}

		},

		showNext: function () {
			methods.checkAnswer();
			currentQuestion++;

			if (currentQuestion == allQuestions.length) {
				methods.showResults();
			} else methods.displayQuestion();

			var checkedAnswer = document.querySelector('input[name="choices"][value="' + selections[currentQuestion] + '"]');

			if(checkedAnswer.value){
				checkedAnswer.checked = true;	
			}; 
				
		},

		showPrevious : function () {
			currentQuestion--;
			methods.displayQuestion();
			var checkedAnswer = document.querySelector('input[name="choices"][value="' + selections[currentQuestion] + '"]');
			checkedAnswer.checked = true;
		},

		checkAnswer: function () {
			var answer = document.querySelector('input[name="choices"]:checked');
			selections[currentQuestion] = +answer.value;
			console.log(selections);
		},

		showResults: function () {
			questions.innerHTML = "";
			radioButton.innerHTML = "";
			next.innerHTML = "";
			back.innerHTML = "";

			var correct = 0;
			for (var i = 0; i < allQuestions.length; i++) {
				if (selections[i] == allQuestions[i].correctAnswer) {
					correct++;
				}
			};

			results.innerHTML = "<p>Congratulations, you're finsihed!</br> You scored " + correct + "/" + allQuestions.length + "!</p>";

			option.innerHTML = "<p>Try Again?</p>" 
			optionButton.innerHTML = "<input type='button' name='yes' value='Yes'/>";

		},

		reDo: function () {
			document.location.reload(true);
		}

	};

	return methods;

})();