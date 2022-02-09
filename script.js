class Question {/**contenu */
  constructor(text, choices, answer) {
    this.text = text; /** this. une variable */
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) { /**fonction */
    return this.answer === choice; 
  }//Si le choix est correct, true :booléen 
}
let questions = [
  new Question("Qu'est-ce qu'un canife?", ["Un souverain", "Un couteau", "Un rassemblement de personne", "Un petit fien"], "Un couteau"),
  new Question("Qu'est-ce qu'un 4x4?", ["Une barre chocolatée","un chat tout terrain", "le cri de la poule", "Une voiture"], "Une voiture"),
  new Question("Qu'est-ce que la capillarité?", ["Les cheveux quand ils tombent","Un phénomène entre un liquide et un solide", "Les températures chaudes", "Dany Larry qui boit du thé"], "Un phénomène entre un liquide et un solide"),
  new Question("Quel pilote automobile espagnol est champion en 2005?", ["Michaël Schumacher", "Laurence Boccolini", "Fernando Alonso", "Michel Paslarèf"], "Fernando Alonso"),
  new Question("Qui est Jean de La Fontaine?", ["Le destinataire des <em>lettres de mon moulin<em>", "L'auteur des <em>Fables</em>", "Un puisatier français", "Le mec qui gère la fontaine à bière les jours de fête"], "L'auteur des <em>Fables</em>")
];

class Quiz { /** la class va nous permettre de mettre en place tous nos éléménets */
  constructor(questions) {
    this.score = 0;/**implémenter chaque bonne réponse : +1 */
    this.questions = questions; /**stocker toutes les questions */
    this.currentQuestionIndex = 0;/**index de la question actuel. L'index 0 pour la question 1. */
  }
  getCurrentQuestion() {/**pour obtenir la question actuelle */
    return this.questions[this.currentQuestionIndex];
  }/**au début l'index est à 0 mais au fur et à mesure qu'on avance dans le jeu, on fait +1 */
  guess(answer) { /**vérifie la réponse de l'utilisateur si c'est true */
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }/**si la réponse est true, on la comptabilise dans le score et on passe à la question suivante */
    this.currentQuestionIndex++;
  }/**L'index passera à la question suivante. */
  hasEnded() { /**Pour quand c'est fini. */
    return this.currentQuestionIndex >= this.questions.length;
  //length permet de connaitre le nombre d'entrée dans un tableau par ex.
  }//si on arrive à l'index de la dernière alors hasEnded(c'est terminé)
}
//regrouper toutes les fonctions dans un display pour pouvoir appliquer tout juste sur le display (l'affichage de l'application)
const display = {  /**une grosse variable avec toutes les fonctions à l'intérieur*/
  elementShown: function(id, text) { //on pointe un id pour lui donner le texte qu'on veut mettre à la place
    let element = document.getElementById(id); //id de la question qu'on retrouve dans le html
    element.innerHTML = text; //Le texte de la question
  }, // on termine la fonction avec une virgule.
  //pas besoin de répéter ces 3 lignes à chaque question. Il suffit d'utiliser l' elementShown.
  endQuiz: function() { //2e élément : endQuiz
    endQuizHTML = `  
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`; //avec les guillemets de la touche 7
    this.elementShown("quiz", endQuizHTML); //Pour afficher sur notre DOM
//paramètres Question et la variable que l'on vient de codé endQuizHTML.
  },
  question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text); //là où il y a écrit "question", apparait le texte de la question en cours. 
    //ça correspond au "text" du constructor et au premier élément de "New Question" dans le "let Question"
  }, 
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;
    //Pour stocker les 4 éléments du tableau , les 4 choix de réponse

    guessHandler = (id, guess) => { //prendre en compte la réponse de l'utilisateur
      document.getElementById(id).onclick = function() { //il prend la valeur cliqué par l'utilisateur et la compare avec la 3e valeur du tableau (la bonne réponse) dans "New Question" de "let Question".
        quiz.guess(guess); //le paramètre guess. On récupère le guess qui a un paramètre "answer"
        quizApp(); //++
      } // => Au clic, on vérifie si la réponse est bonne.
    }
    // affichage choix + prise en compte du choix
    for(let i = 0; i < choices.length; i++) { //tant que i est inférieur à la longueur, on fait ++ (on avance de 1)
      this.elementShown("choice" + i, choices[i]); 
      guessHandler("guess" + i, choices[i]); // on concatène choice. Il va pointer l'id
    }
  },//A ce stade, tous les élements du QCM (questions et réponses) sont affichés.
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1; //le nombre de la question en cours
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  }, //this pour l'afficher, on pointe l'idée "progress" et on va concaténé: question , le nombre actuel, sur la longueur
};

// Logique du jeu au fur et à mesure que le jeu avance
quizApp = () => {
  if (quiz.hasEnded()) { //si le jeu est fini
    display.endQuiz(); //pour appeler la fonction endQuiz qui est dans display
  } else { //sinon (si jeu pas fini), on affiche la question suivante avec ses choix et la progression dans le jeu.
    display.question(); //afficher la question en cours
    display.choices();
    display.progress(); //l'avancée du jeu
  } 
}
// Creer le QCM
let quiz = new Quiz(questions);/** On créé l'objet quiz avec en paramètre questions */
quizApp(); //On appelle quizApp. Il va lancer tout l'affichage de notre application
