import { expect } from 'chai';
import { Dog, Wolf } from '../target/zoo';
//Chai是一个BDD/TDD模式的断言库，也可以同时运行在node和浏览器环境，
//能够高效的和绝大多数JavaScript测试框架搭配使用。 
//BDD，行为驱动开发（注重测试逻辑），TDD是测试驱动开发（注重输出结果）。
describe('the zoo module', () => {
	it('should instantiate a regular dog', () => {
		var dog = new Dog('Sherlock', 'beagle');
		expect(dog.bark()).to.equal('Sherlock: woof, woof!');
	});

	it('should instantiate a husky dog', () => {
		var dog = new Dog('Whisky', 'husky');
		expect(dog.bark()).to.equal('Whisky: woooooow!');
	});

	it('should instantiate a wolf', () => {
		var wolf = new Wolf('Direwolf');
		expect(wolf.bark()).to.equal('Direwolf: woooooow!');
	});
	
//钩子，你可以提供描述信息，只需要提供一个参数即可（或者使用命名的函数作为回调）：
  before(function() {
	//expect(1).to.equal(1);
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

});