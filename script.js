/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function stampa(){
    console.log("La mappa contiene " + selected_answers.size + " elementi");
    console.log("Risposte: ");
    for(let s_a of selected_answers){
        console.log(s_a);
    }
}


function reset(){
    selected_answers.clear();
    const answers = document.querySelectorAll(".choice-grid div");
    for(const answer of answers){
        answer.classList.remove("choosed");
        answer.classList.remove("notchoosed");
        answer.querySelector(".checkbox").src = "unchecked.png";
        answer.addEventListener("click", sel_ans);
    }
    const elements = document.querySelectorAll(".darimuovere");
    for(const elem of elements){
        elem.remove();
    }
}


function mostra_personalita(event){
    let a = "";
    if(selected_answers.get("one") === selected_answers.get("two") || selected_answers.get("one") === selected_answers.get("three")){
        const question = selected_answers.get("one");
        a = question;
    }
    else if(selected_answers.get("two") === selected_answers.get("three")){ 
        const question = selected_answers.get("two");
        a = question;
    }
    else if(selected_answers.get("one") !== selected_answers.get("two") && selected_answers.get("two") !== selected_answers.get("three")){
        const question = selected_answers.get("one");
        a = question;
    }
    const new_h1 = document.createElement("h1");
    new_h1.classList.add("darimuovere");
    new_h1.textContent = RESULTS_MAP[a].title;
    const new_p = document.createElement("p");
    new_p.classList.add("darimuovere");
    new_p.textContent = RESULTS_MAP[a].contents;
    const new_button = document.createElement("button");
    new_button.classList.add("darimuovere");
    new_button.textContent = "Ricomincia il quiz";
    const new_article = document.querySelector("article");
    new_article.appendChild(new_h1);
    new_article.appendChild(new_p);
    new_article.appendChild(new_button);
    new_button.addEventListener("click", reset);
}


function sel_ans(event){
    const el = event.currentTarget;
    const questionNumber = el.dataset.questionId;
    const choiceCap = el.dataset.choiceId;
    for(const ans of answers){
        if(ans.dataset.questionId === questionNumber && ans.dataset.choiceId === choiceCap){
            ans.querySelector(".checkbox").src = "checked.png";
            ans.classList.add("choosed");
            ans.classList.remove("notchoosed");
            selected_answers.set(questionNumber, choiceCap);
            stampa();
            if(selected_answers.size === 3){
                mostra_personalita();
                for(const ans of answers){
                    ans.removeEventListener("click", sel_ans);
                }
            }
        }
        else if(ans.dataset.questionId === questionNumber && ans.dataset.choiceId !== choiceCap){
            ans.querySelector(".checkbox").src = "unchecked.png";
            ans.classList.add("notchoosed");
            ans.classList.remove("choosed");
        }
    }
}


// Inizio (logico) dello script

const selected_answers = new Map();

const answers = document.querySelectorAll(".choice-grid div");

for(const answer of answers){
    answer.addEventListener("click", sel_ans);
}
