const media = require("./mediaEscolar");

console.log(media.nome);

let mediaEscolar = media.mediaEscolar(5, 5, 5);

console.log(
  "A media do aluno:",
  media.nome,
  "que tirou 8. 10. 9. e:",
  mediaEscolar
);

if (mediaEscolar > 7) {
  console.log("Aprovado");
} else if (mediaEscolar > 5) {
  console.log("Recuperacao");
} else {
  console.log("Reprovado");
}
