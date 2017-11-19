


/* Class for representing a question and a set of possible answers. */
class Question{
    constructor(question, correct, alternatives){
        this.question = question;
        this.correct = correct;
        this.alternatives = alternatives;
        this.alternatives.push(correct);
    }
}

let questions = [];
let counter = -1;
let correctAnswered = 0;
let answered = 0;
let answerSelected = false;


/* Fetch data in JSON format.
   Iterate over all categories, and append an option for each of them.
 */
function fillCategories(){
    const url = "https://opentdb.com/api_category.php";

    $.getJSON(url, function(jsonData){
        $.each(jsonData.trivia_categories, function(index, val) {
            $("#catSel").append(
                $("<option></option>").attr("id",val.id).text(val.name)
            );
        });
    });
}



/* When start button is clicked, categoryID and difficulty is retrieved.
   The corresponding questions are then fetched from remote database in
   JSON format. Each question is then parsed and stored as Question object.
   Finally, the quiz-page loads.
 */
function startClicked(){
    let categoryID = $("#catSel").find(":selected").attr("id");
    let difficulty = $("#diffSel").find(":selected").attr("id");

    const url = "https://opentdb.com/api.php?amount=10&category="+categoryID+
        "&difficulty="+difficulty+"&type=multiple";

    counter = 0;
    questions = [];
    answerSelected = false;
    answered = 0;
    correctAnswered = 0;
    $.getJSON(url, function(jsonData){
        $.each(jsonData.results, function(index, val) {
            questions.push( new Question(val.question, val.correct_answer, val.incorrect_answers));
        });
        fillQuestionDiv();
        $(".view").hide();
        $("#alerts").text("");
        $("#score").text("Score: "+correctAnswered+" \/ "+answered);
        $("#quizBlock").show();
    });
}



/* Fill the quiz-div with a question, and 4 possible answers
 */
function fillQuestionDiv(){
    counter++;
    if(counter == questions.length) {
        $("#alerts").text("No more questions");
        return;
    }
    $(".quizB").css("background-color","Gainsboro");
    $("#question").text( decode(questions[counter].question) );

    questions[counter].alternatives = shuffle(questions[counter].alternatives, 4);

    for(let i=1; i<=4; i++){
        $("#b"+i).text( decode(questions[counter].alternatives[i-1]) );
    }
}



/* Whenever an answer is selected, the selected answer is compared
   against the correct answer. If they match, button is colored green.
   If they don't match, button is colored red.
 */
function answerClicked(buttonId){
    if(answerSelected)
        return;
    answered++;
    if( questions[counter].correct == $("#"+buttonId).text()){
        $("#"+buttonId).css("background-color","green");
        correctAnswered++;
    }
    else{
        $("#"+buttonId).css("background-color","red");
    }
    $("#score").text("Score: "+correctAnswered+" \/ "+answered);
    answerSelected = true;
}



/* Fetch the next question stored (if any)
 */
function getNextQuestion(){
    if(answerSelected) {
        answerSelected = false;
        fillQuestionDiv();
    }
}



/*  Hides the quiz-view, and displays the menu view.
    Resets any progressed made on an ongoing quiz.
 */
function returnToMenu(){
    counter = -1;
    answerSelected = false;
    $(".view").hide();
    $("#mainMenu").show();
}



$(document).ready( function() {
    $(".view").hide();
    fillCategories();
    $("#mainMenu").show();
});


