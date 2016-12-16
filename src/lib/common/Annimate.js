class Annimate {
	constructor(){
		console.log("init");
	}

	hello(){
		console.log("hello"); 
		var func = () => {
			console.log("func")
		}
		func();

		 
	}
}