console.log("Hello World");


let num1 = 12
let num2 = 34
let sum = num1 + num2;

console.log( "The sum is: ", sum );

function filterOutNumbers(arr){

	let newArr = [];

	for(let i = 0; i < arr.length; i++){
		if( isNaN(arr[i]) ){
			newArr.push(arr[i]);
		}
	}

	return newArr;
}

function filterOutStrings(arr){
	// Let students figure out
}


let arr = [1,2,3,4,5,6,"hi", 'hello', 'world']

console.log(arr[5]); //Output: 6

function isEvenOrOdd(number){
	if( number % 2 == 0 ){
		return "Even"
	}else{
		return "Odd"
	}
}


let arr2 = [1,2,3,"Hello", 'world'];

console.log(filterOutNumbers(arr2));


let obj = {
	key: "value",
	name: "Prashant Shrestha",
	age: 21,
	city: "Dharan"
}

console.log(obj.name) // Output: Prashant Shrestha
console.log(obj["name"]) // Output: Prashant Shrestha


let Employee = [
	{ name: "Shyam", eId: 1, salary: 30000, gender: 'Male' },
	{ name: "Rima", eId: 5, salary: 35000, gender: 'Female' },
	{ name: "Krish", eId: 9, salary: 10000, gender: 'Male' },
]

console.log(Employee);

function getFemaleEmployee( arr ){

	let femaleEmployee = [];

	for(let i = 0; i< arr.length; i++){
		if(arr[i].gener == "Female"){
			femaleEmployee.push(arr[i]);
		}
	}

	return femaleEmployee;
}