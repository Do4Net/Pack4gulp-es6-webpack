import Test from '../lib/index.js'; 

document.getElementById('loadding').addEventListener('click', e => {
	require.ensure([], () => { 
		var test=new Test("xiaoming");
		test.hello();
	});
  
});