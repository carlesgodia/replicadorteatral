var main_char;
var num = 0;

window.onload = showSections;

function showSections(){
    document.getElementById('1part').style.display = 'block';
    document.getElementById('2part').style.display = 'none';
    document.getElementById('3part').style.display = 'none';
}

function test(input){
    require("docx2html")(input.files[0]).then(function(converted){
      text.value=converted.toString()
    })
    document.getElementById('2part').style.display = 'block';
    document.getElementById('1part').style.display = 'none';
}

function characters(){
    document.getElementById("but_character").style.display = 'none';
    document.getElementById("A").style.display = 'none';
    document.getElementById("selectBox").style.display = 'block';

    const characters = document.querySelectorAll("p[style='margin-left: 94px; text-indent: -94px;'] > span:first-child.Fuentedeprrafopredeter");
    const uniqueNames = [];
    
    for (var i = 0; i < characters.length; i++) {
        uniqueNames.push(characters[i].textContent.split(" ").join(""));
    }
    
    uniqueArray = uniqueNames.filter(function(item, pos) {
        return uniqueNames.indexOf(item) == pos;
    });

    let select = document.getElementById("selectBox");
    let option0 = document.createElement("option");
    let option0Texto = document.createTextNode("Seleciona un personaje");
    option0.appendChild(option0Texto);
    select.appendChild(option0);

    for (var i = 0; i < uniqueArray.length; i++) {
        let option1 = document.createElement("option");
        let option1Texto = document.createTextNode(uniqueArray[i]);
        option1.appendChild(option1Texto);
        select.appendChild(option1);
    }
}

function changeFunc() {
    document.getElementById('3part').style.display = 'block';
    document.getElementById('see').style.display = 'none';
    document.getElementById('2part').style.display = 'none';

    var selectBox = document.getElementById("selectBox");
    main_char = selectBox.options[selectBox.selectedIndex].value;

    showText(num);
}

function showText(numero){
    num = numero;
    const script = document.querySelectorAll("p[style='margin-left: 94px; text-indent: -94px;']");
    var character = script[numero].childNodes[0].textContent.split(" ").join("");
    var text = "";
    for(var i = 1; i< script[numero].childNodes.length; i++){
        text = text + script[numero].childNodes[i].textContent;
    }

    if (character == main_char){
        document.getElementById('see').style.display = 'block';
        var element = document.getElementById('text_text');
        element.classList.add("blur");
    } else{
        document.getElementById('see').style.display = 'none';
        var element = document.getElementById('text_text');
        element.classList.remove("blur");
    }
    document.getElementById('text_character').textContent = character;
    document.getElementById('text_text').textContent = text;
}

function prev_replica(){
    num--;
    if(num <= 0){
        num = 0;
    }
    showText(num);
}

function next_replica(){
    num++;
    const script = document.querySelectorAll("p[style='margin-left: 94px; text-indent: -94px;']");
    var final = script.length;

    if(num >= final){
        num = final;
    }
    showText(num);
}
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        next_replica()
    }
  });

function seePhrase(){
    document.getElementById('see').style.display = 'none';
    var element = document.getElementById('text_text');
    element.classList.remove("blur");
}