
/* Decode a string
* */
function decode(sentence) {
    return $("<textarea/>").html(sentence).text();
}



/* Shuffle the order of the elements in an array
 */
function shuffle(array, len){

    for(let i=0; i<array.length; i++){
        let randNumb = Math.floor( Math.random() * len);
        //alert(randNumb);
        let temp = array[i];
        array[i] = array[randNumb];
        array[randNumb] = temp;
    }
    return array;
}