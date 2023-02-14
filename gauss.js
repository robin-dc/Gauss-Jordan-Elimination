// ROBIN DELA CRUZ
// BSCPE 2A
// DONE IN 2 DAYS

const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// GOAL: FIND 1 IN THE COUNTERPART INDEX.`
// IF THERE IS THE SAME NUMBER IN THE COUNTERPART INDEX THEN JUST ADD THE ROW OF THE TWO
// IF NOT THE SAME THEN FIND THE 1 IN THE COUNTERPART INDEX THEN MULTIPLY THE NEGATED NUMBER TO THE ROW
// THAT HAS 1 ON IT THEN ADD THE ROW THAT IS BEING EVALUATED

console.log(" ")
console.log("===========================================================")
console.log("                                                           ")
console.log("                  GAUSS JORDAN ELIMINATION                 ")
console.log("                                                           ")
console.log("===========================================================")
console.log(" ")

// ================================================ START =================================================

const askMatrix = () => {
    rl.question("Input the size of the Matrix: A for 2x2, B for 3x3: ", checkMatrix)
}

const checkMatrix = chosen => {
    if(chosen === "A" || chosen === "a" || chosen === "2" || chosen === "A."){
        ask2x2()
    }
    else if(chosen === "B" || chosen === "b" || chosen === "3" || chosen === "B."){
        ask3x3()
    }
    else{
        askMatrix()
    }
}

// =================================== ENTERING NUMBERS FOR 3X3 MATRIX ===================================
const ask3x3 = () => {
    console.log(" ")
    console.log("YOU CHOSE 3X3 MATRIX:  INPUTS MUST BE SEPARATED BY SPACES! ")
    console.log(" ")
    let matrix = []

    function ask1st() {
        rl.question('Enter first row: ', first => {
            let firstArr = first.split(" ")
            if(limitIrrational(firstArr) === false){
                console.log("There is an irrational number, Enter Again!")
                ask1st()
            }
            else if(firstArr.length != 4){
                console.log("4 elements required! Try again.")
                ask1st()
            }
            else{
                matrix.push(firstArr.map( item => fractionToDecimal(item)))
                ask2nd()
            }
        });
    }
    function ask2nd() {
        rl.question('Enter second row: ', second => {
            let secondArr = second.split(" ")

            if(limitIrrational(secondArr) === false){
                console.log("There is an irrational number, Enter Again!")
                ask2nd()
            }
            else if(secondArr.length != 4){
                console.log("4 elements required! Try again.")
                ask2nd()
            }
            else{
                matrix.push(secondArr.map( item => fractionToDecimal(item)))
                ask3rd()
            }
        });
    }

    function ask3rd() {
        rl.question('Enter third row: ', third => {
            let thirdArr = third.split(" ")

            if(limitIrrational(thirdArr) === false){
                console.log("There is an irrational number, Enter Again!")
                ask3rd()
            }
            else if(thirdArr.length != 4){
                console.log("4 elements required! Try again.")
                ask3rd()
            }
            else{
                matrix.push(thirdArr.map( item => fractionToDecimal(item)))
                gaussianElimination(matrix)
            }
        });
    }
    ask1st()
}

// =================================== ENTERING NUMBERS FOR 2X2 MATRIX ===================================
const ask2x2 = () => {
    console.log(" ")
    console.log("YOU CHOSE 2X2 MATRIX:  INPUTS MUST BE SEPARATED BY SPACES! ")
    console.log(" ")

    let matrix = []
    function ask1st() {
        rl.question('Enter first row: ', first => {
            let firstArr = first.split(" ")
            if(limitIrrational(firstArr) === false){
                console.log("There is an irrational number, Enter Again!")
                ask1st()
            }
            else if(firstArr.length != 3){
                console.log("3 elements required! Try again.")
                ask1st()
            }
            else{
                matrix.push(firstArr.map( item => fractionToDecimal(item)))
                ask2nd()
            }

        });
    }
    // ROBIN DELA CRUZ
    function ask2nd() {
        rl.question('Enter second row: ', second => {
            let secondArr = second.split(" ")
            if(limitIrrational(secondArr) === false){
                console.log("There is an irrational number, Enter Again!")
                ask2nd()
            }
            else if(secondArr.length != 3){
                console.log("3 elements required! Try again.")
                ask2nd()
            }
            else{
                matrix.push(secondArr.map( item => fractionToDecimal(item)))
                gaussJordan2x2(matrix)
            }

        });
    }

    ask1st()
}

// ======================================= LIMITING IRRATIONAL NUMBERS ====================================
function limitIrrational(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!Number.isInteger(parseFloat(arr[i]))) { // check if the number is not a whole number
        return false;
      }
    }
    return true;
  }

// =========================================== GAUSSIAN ELIMINATION ========================================
function  gaussianElimination(arr) {
    // rl.close()
    console.log(" ")
    console.log(" ")
    console.log("MATRIX: ")
    console.log(arr[0].join("\t"))
    console.log(arr[1].join("\t"))
    console.log(arr[2].join("\t"))
    console.log(" ")

    for (let col = 0; col < arr[0].length; col++) {
        for (let row = 0; row < arr.length; row++) {
            let a = formula(arr, row, col, arr[row][col]);
            if(a === true){

                return ask3x3();
            }
        }
    }
// ROBIN DELA CRUZ
    gaussJordan(arr)
}

// ============================================== GAUSS JORDAN ==============================================
function gaussJordan(arr){

    for (let col = 0; col < arr[0].length; col++) {
        for (let row = 0; row < arr.length; row++) {
          formula2(arr, row, col, arr[row][col]);
        }
    }
    rl.close()
    console.log(" ")
    console.log(" ")
    console.log("REDUCED ROW-ECHELON FORM: ")
    console.log(" ")
    console.log(arr[0].join("\t"))
    console.log(arr[1].join("\t"))
    console.log(arr[2].join("\t"))
    console.log(" ")
    let obj = {
        x: arr[0][arr[0].length - 1],
        y: arr[1][arr[1].length - 1],
        z: arr[2][arr[2].length - 1]
    };
    let str = "x : " + obj.x + "\t y : " + obj.y + "\t z : " + obj.z;
    console.log(str);
    console.log(" ")

}

function  gaussJordan2x2(arr) {
    // rl.close()
    console.log(" ")
    console.log(" ")
    console.log("MATRIX: ")
    console.log(arr[0].join("\t"))
    console.log(arr[1].join("\t"))
    console.log(" ")

    let rows = arr.length;
    let cols = arr[0].length;
    let up = false;

    for (let col = 0; col < cols; col++) {
      if (up) {
        for (let row = rows - 1; row >= 0; row--) {
            let a = formula2x2(arr, row, col, arr[row][col]);
            if(a === true){

                return ask2x2();
            }
        }
        up = false;
      } else {
        for (let row = 0; row < rows; row++) {
            let a = formula2x2(arr, row, col, arr[row][col]);
            if(a === true){

                return ask2x2();
            }
        }
        up = true;
      }
    }

    rl.close()
    console.log(" ")
    console.log(" ")
    console.log("REDUCED ROW-ECHELON FORM: ")
    console.log(" ")
    console.log(arr[0].join("\t"))
    console.log(arr[1].join("\t"))
    console.log(" ")
    let obj = {
        x: arr[0][arr[0].length - 1],
        y: arr[1][arr[1].length - 1]
    };
    let str = "x : " + obj.x + "\t y : " + obj.y;
    console.log(str);
    console.log(" ")
}
// ======================================== LIMITING MANY OR NO SOLUTION ====================================
function manySolution(arr){
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        return true; // if an element is not zero
      }
    }
// ROBIN DELA CRUZ
    return false; // all elements are zero
}

function noSolution(arr){
    for (let i = arr.length - 2; i > 0; i--) {
      if (arr[i] !== 0) {
        return true; // if an element is not zero
      }
    }

    return false; // all elements are zero
}
// =========================================== LIMITING DECIMAL POINTS ======================================

function decimal(num) {
    if (Number.isInteger(num)) {  // check if the number is a whole number
      return num;  // if so, return it without formatting
    } else {
      return Math.round(num * 10) / 10;  // otherwise, round to 1 decimal place using the toFixed() method
    }
}

// ============================================= FRACTION TO DECIMAL ========================================

function fractionToDecimal(fraction) {
    if(!isNaN(Number(fraction))){ // if not NaN
        return Number(fraction)
    }
    else{
        let parts = fraction.split("/");
        let numerator = parseInt(parts[0]);
        let denominator = parseInt(parts[1]);
        return numerator / denominator;
    }

}// ROBIN DELA CRUZ

// =================================================== FORMULAS =============================================

// FORMULA 1
function formula(array, row, column, num){

    if(manySolution(array[2]) === false){
        console.log(" ")
        console.log("The system has many solution! Change your elements. Here’s the row reduced matrix.")
        console.log(array[0].join("\t"))
        console.log(array[1].join("\t"))
        console.log(array[2].join("\t"))
        return true;
    }
    else if(noSolution(array[2]) === false) {
        console.log(" ")
        console.log("The system has no solution! Change your elements. Here’s the row reduced matrix.")
        console.log(array[0].join("\t"))
        console.log(array[1].join("\t"))
        console.log(array[2].join("\t"))
        return true;
    }

    else{

        if(row === 1 && column === 1 && num === 0 ){
            let newArr = array[1]
            if(array[row-1][column] < 0){
                console.log("============================ EXCHANGE R2 AND R3")
                console.log(array[0].join("\t"))
                console.log(array[2].join("\t"))
                console.log(array[1].join("\t"))
                array[1] = array[2]
                array[2] = newArr
                let normalArr = array[row]
                let num2 = array[1][1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = normalArr[k]/ num2
                    if(positiveZero == "-0"){
                        normalArr[k] = 0
                    }
                    else{
                        normalArr[k] = decimal(positiveZero)
                    }

                }
                console.log(" ")
                console.log(`============================ 1/${num2} R${row+1} => R${row+1}`)
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
// ROBIN DELA CRUZ
            }
            else if(array[row+1][column] < 0){
                console.log("============================ EXCHANGE R2 AND R1")
                console.log(array[1].join("\t"))
                console.log(array[0].join("\t"))
                console.log(array[2].join("\t"))
                array[1] = array[0]
                array[0] = newArr
                let normalArr = array[row]
                let num2 = array[1][1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = normalArr[k]/ num2
                    if(positiveZero == "-0"){
                        normalArr[k] = 0
                    }
                    else{
                        normalArr[k] = decimal(positiveZero)
                    }

                }
                console.log(" ")
                console.log(`============================ 1/${num2} R${row+1} => R${row+1}`)
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }


        }
    // FOR ONES ========================================================
    else if(row === 0 && column === 0 && num != 1 || row === 1 && column === 1 && num != 1 || row === 2 && column === 2 && num != 1){
        let normalArr = array[row]
        for(let k = 0; k < normalArr.length; k++){
            let positiveZero = normalArr[k]/ num
            if(positiveZero == "-0"){
                normalArr[k] = 0
            }
            else{
                normalArr[k] = decimal(positiveZero)
            }

        }
        console.log(" ")
        console.log(`============================ 1/${num} R${row+1} => R${row+1}`)
        console.log(" ")
        console.log(array[0].join("\t"))
        console.log(array[1].join("\t"))
        console.log(array[2].join("\t"))
        return array


    }
    // ==================================================================

    // FOR ZEROS ========================================================
    if(row === 1 && column === 0 && num != 0 || row === 2 && column === 0 && num != 0 || row === 2 && column === 1 && num != 0){
        if(row === 0){
            if(num === array[row+1][column] * -1){
                let normalArr = array[row]
                let addArr = array[row+1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }

                }
                console.log(" ")
                console.log("============================ R1 + R2 => R1")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else if(num === array[row+2][column] * -1){
                let normalArr = array[row]
                let addArr = array[row+2]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]// ROBIN DELA CRUZ
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }
                }
                console.log(" ")
                console.log("============================ R1 + R3 => R1")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else{
                if(array[row+1][column] === 1){
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row+1]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }// ROBIN DELA CRUZ
                        else{
                            array[row][k] = decimal(positiveZero)
                        }
                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R2 + R1 => R1`)
                    }
                    else{
                        console.log("============================ -" + num + " * R2 + R1 => R1")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))
                    return array
                }
                else{
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row+2]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)// ROBIN DELA CRUZ
                        }
                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R3 + R1 => R1`)
                    }
                    else{
                        console.log("============================ -" + num + " * R3 + R1 => R1")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))
                    return array
                }
            }
        }
        if(row === 1){
            if(num === array[row-1][column] * -1){
                let normalArr = array[row]
                let addArr = array[row-1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R1 + R2 => R2")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else if(num === array[row+1][column] * -1){
                let normalArr = array[row]// ROBIN DELA CRUZ
                let addArr = array[row+1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R3 + R2 => R2")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else{
                let newArr = []
                let normalArr = array[row]
                let TimesArr = array[row-1]
                let negate = num * -1

                for(let i = 0; i < TimesArr.length; i++){
                    let negativeZero = negate * TimesArr[i]
                    if(negativeZero == "-0"){
                        newArr.push(0)
                    }
                    else{
                        newArr.push(decimal(negativeZero))
                    }
                }
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = newArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{// ROBIN DELA CRUZ
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                if(num < 0){
                    console.log(`============================ ${num * -1} * R1 + R2 => R2`)
                }
                else{
                    console.log("============================ -" + num + " * R1 + R2 => R2")
                }
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
        }
        if(row === 2){
            if(num === array[row-1][column] * -1){
                let normalArr = array[row]
                let addArr = array[row-1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R2 + R3 => R3")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else if(num === array[row-2][column] * -1){
                let normalArr = array[row]// ROBIN DELA CRUZ
                let addArr = array[row+1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R1 + R3 => R3")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else{
                if(array[row-1][column] === 1){
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row-1]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]// ROBIN DELA CRUZ
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }
                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R2 + R3 => R3`)
                    }
                    else{
                        console.log("============================ -" + num + " * R2 + R3 => R3")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))
                    return array
                }
                else{// ROBIN DELA CRUZ
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row-2]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }// ROBIN DELA CRUZ

                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R1 + R3 => R3`)
                    }
                    else{
                        console.log("============================ -" + num + " * R1 + R3 => R3")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))
                    return array
                }
            }
        }
    }// ROBIN DELA CRUZ
    }
    // ==================================================================
}

// FORMULA 2
function formula2(array, row, column, num){
    // FOR ZEROS ========================================================
    if(row === 0 && column === 1 && num != 0 || row === 0 && column === 2 && num != 0 || row === 1 && column === 2 && num != 0){
        if(row === 0){
            if(num === array[row+1][column] * -1){
                let normalArr = array[row]
                let addArr = array[row+1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }// ROBIN DELA CRUZ
                console.log(" ")
                console.log("============================ R1 + R2 => R1")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else if(num === array[row+2][column] * -1){
                let normalArr = array[row]
                let addArr = array[row+2]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")// ROBIN DELA CRUZ
                console.log("============================ R1 + R3 => R1")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else{
                if(array[row+1][column] === 1){
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row+1]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]// ROBIN DELA CRUZ
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }
                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R2 + R1 => R1`)
                    }
                    else{
                        console.log("============================ -" + num + " * R2 + R1 => R1")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))
                    return array
                }
                else{
                    let newArr = []// ROBIN DELA CRUZ
                    let normalArr = array[row]
                    let TimesArr = array[row+2]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }// ROBIN DELA CRUZ

                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R3 + R1 => R1`)
                    }
                    else{
                        console.log("============================ -" + num + " * R3 + R1 => R1")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))
                    return array
                }
            }
        }
        if(row === 1){
            if(num === array[row-1][column] * -1){
                let normalArr = array[row]
                let addArr = array[row-1]// ROBIN DELA CRUZ
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R1 + R2 => R2")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else if(num === array[row+1][column] * -1){// ROBIN DELA CRUZ
                let normalArr = array[row]
                let addArr = array[row+1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R3 + R2 => R2")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }// ROBIN DELA CRUZ
            else{
                let newArr = []
                let normalArr = array[row]
                let TimesArr = array[row+1]
                let negate = num * -1

                for(let i = 0; i < TimesArr.length; i++){
                    let negativeZero = negate * TimesArr[i]
                    if(negativeZero == "-0"){
                        newArr.push(0)
                    }
                    else{
                        newArr.push(decimal(negativeZero))
                    }
                }
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = newArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{// ROBIN DELA CRUZ
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                if(num < 0){
                    console.log(`============================ ${num * -1} * R3 + R2 => R2`)
                }
                else{
                    console.log("============================ -" + num + " * R3 + R2 => R2")
                }
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array// ROBIN DELA CRUZ

            }
        }
        if(row === 2){
            if(num === array[row-1][column] * -1){
                let normalArr = array[row]
                let addArr = array[row-1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R2 + R3 => R3")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))// ROBIN DELA CRUZ
                console.log(array[2].join("\t"))
                return array
            }
            else if(num === array[row-2][column] * -1){
                let normalArr = array[row]
                let addArr = array[row+1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R1 + R3 => R3")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                console.log(array[2].join("\t"))
                return array
            }
            else{
                if(array[row-1][column] === 1){
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row-1]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }

                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R2 + R3 => R3`)
                    }
                    else{
                        console.log("============================ -" + num + " * R2 + R3 => R3")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))// ROBIN DELA CRUZ
                    return array
                }
                else{
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row-2]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }
                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R1 + R3 => R3`)
                    }
                    else{
                        console.log("============================ -" + num + " * R1 + R3 => R3")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    console.log(array[2].join("\t"))
                    return array
                }
            }
        }
    }
    // ==================================================================
}

// FORMULA FOR 2X2
function formula2x2(array, row, column, num){
    if(manySolution(array[1]) === false){
        console.log(" ")
        console.log("The system has many solution! Change your elements. Here’s the row reduced matrix.")
        console.log(array[0].join("\t"))
        console.log(array[1].join("\t"))
        return true;
    }
    else if(noSolution(array[1]) === false) {
        console.log(" ")// ROBIN DELA CRUZ
        console.log("The system has no solution! Change your elements. Here’s the row reduced matrix.")
        console.log(array[0].join("\t"))
        console.log(array[1].join("\t"))
        return true;
    }

    else{
    // FOR ONES ========================================================
    if(row === 0 && column === 0 && num != 1 || row === 1 && column === 1 && num != 1){
        let normalArr = array[row]

        for(let k = 0; k < normalArr.length; k++){
            let positiveZero = normalArr[k]/ num
            if(positiveZero == "-0"){
                normalArr[k] = 0
            }
            else{
                normalArr[k] = decimal(positiveZero)
            }

        }
        console.log(" ")
        console.log(`============================ 1/${num} R${row+1} => R${row+1}`)
        console.log(" ")
        console.log(array[0].join("\t"))
        console.log(array[1].join("\t"))
        return array
    }
    // ==================================================================

    // FOR ZEROS ========================================================
    if(row === 1 && column === 0 && num != 0 || row === 0 && column === 1 && num != 0){
        if(row === 0){
            if(num === array[row+1][column] * -1){
                let normalArr = array[row]
                let addArr = array[row+1]
                for(let k = 0; k < normalArr.length; k++){
                    let positiveZero = addArr[k] + normalArr[k]
                    if(positiveZero == "-0"){
                        array[row][k] = 0
                    }
                    else{
                        array[row][k] = decimal(positiveZero)
                    }
                }
                console.log(" ")
                console.log("============================ R1 + R2 => R1")
                console.log(" ")
                console.log(array[0].join("\t"))
                console.log(array[1].join("\t"))
                return array
            }
            else{
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row+1]
                    let negate = num * -1

                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }

                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{// ROBIN DELA CRUZ
                            array[row][k] = decimal(positiveZero)
                        }
                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R2 + R1 => R1`)
                    }
                    else{
                        console.log("============================ -" + num + " * R2 + R1 => R1")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    return array
                }
            }
            if(row === 1){
                if(num === array[row-1][column] * -1){
                    let normalArr = array[row]
                    let addArr = array[row-1]
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = addArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }
                    }
                    console.log(" ")
                    console.log("R1 + R2 => R2")
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    return array
                }
                else{
                    let newArr = []
                    let normalArr = array[row]
                    let TimesArr = array[row-1]
                    let negate = num * -1
// ROBIN DELA CRUZ
                    for(let i = 0; i < TimesArr.length; i++){
                        let negativeZero = negate * TimesArr[i]
                        if(negativeZero == "-0"){
                            newArr.push(0)
                        }
                        else{
                            newArr.push(decimal(negativeZero))
                        }
                    }
                    for(let k = 0; k < normalArr.length; k++){
                        let positiveZero = newArr[k] + normalArr[k]
                        if(positiveZero == "-0"){
                            array[row][k] = 0
                        }
                        else{
                            array[row][k] = decimal(positiveZero)
                        }
                    }
                    console.log(" ")
                    if(num < 0){
                        console.log(`============================ ${num * -1} * R1 + R2 => R2`)
                    }
                    else{
                        console.log("============================ -" + num + " * R1 + R2 => R2")
                    }
                    console.log(" ")
                    console.log(array[0].join("\t"))
                    console.log(array[1].join("\t"))
                    return array
                }
            }
        }
    }
    }
    // ==================================================================

askMatrix()
