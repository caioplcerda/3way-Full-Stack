const fabricantes = ["Mercedes", "Audi", "BMW"];
const jogadores = ["Neymar", "Pele", "Zico"];

function imprimir(nome, indice){
    console.log((indice + 1) + ". " + nome)

    //console.log(`${indice + 1}. ${nome}`)
}

fabricantes.forEach(x => console.log(x));

//evento callbeck. cada chamada do array por elemento o metodo e invocado
fabricantes.forEach(imprimir);
jogadores.forEach(imprimir)