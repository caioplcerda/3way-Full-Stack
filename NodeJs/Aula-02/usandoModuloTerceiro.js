const _ =  require('lodash')
/*
for (let index = 1; index <= 5; index++) {
    console.log(_.random(1, 500))
}
*/
setInterval(() => {
    console.log(_.random(1, 500))
}, 1000)
