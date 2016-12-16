 
export default class Test {
	constructor(name){
		this.name=name;
		console.log("init");
	}

	hello(){
		require.ensure([], () => {
			var $=require("jquery");
 			$("#btn").html("hi");
		});
		 
      require.ensure([],()=>{
      	var Annimate=require("./common/Annimate");
      	new Annimate().hello();
      })
	}
}

// //new Test().hello();

// export default Test;