const pilotos = ["Vettel", "Alonso", "Raikkonen", "Massa"];

console.log(pilotos);

// parametros spread (espalhar)
console.log(...pilotos)

pilotos.forEach(piloto => console.log(piloto));

// template string
pilotos.forEach(function(nome, indice) {
    console.log(`${indice + 1}. ${nome}`);
});