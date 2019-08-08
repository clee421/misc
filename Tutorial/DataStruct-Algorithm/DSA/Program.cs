using System;

namespace DSA
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			HelloWorld hello = new HelloWorld("Fred");
			hello.Print();

      TestLinkedList linkedListTest = new TestLinkedList();
      linkedListTest.run();

      PostfixCalculator calc = new PostfixCalculator();
      string[] postfixInput = new string[5] { "5", "7", "+", "3", "*" };
      int answer = calc.calculate(postfixInput);
      Console.WriteLine(answer);
		}
	}
}
