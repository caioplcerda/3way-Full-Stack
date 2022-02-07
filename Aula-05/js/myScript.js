calcularMediaEscolar = () =>{


    //entrada
    let nome = document.getElementById("nome").value;
    let disciplina = document.getElementById("disciplina").value;

    let nota1 = parseFloat(document.getElementById("nota1").value);
    let nota2 = parseFloat(document.getElementById("nota2").value);
    let nota3 = parseFloat(document.getElementById("nota3").value);

    let media = (nota1 + nota2 + nota3) / 3;

    let result = "Aluno: " + nome;
    result += "<br>Disciplina: " + disciplina;
    result += "<br>Media: " + media.toFixed(1)

    if(media >= 7){
        result += "<br>Situacao: APROVADO ;)";
    }else if(media >= 5){
        result += "<br>Situacao: RECUPERACAO :/";
    }else{
        result += "<br>Situacao: REPRVADO :(";
    }

    //saida
    document.getElementById("resultado").innerHTML = result;

}