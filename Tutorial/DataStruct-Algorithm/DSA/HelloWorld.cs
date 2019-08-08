using System;

public class HelloWorld
{	
	public string Name { get; set; }

	public HelloWorld(string name)
	{
		Name = name;
	}

	public void Print()
	{
		Console.WriteLine($"{Name} says, Hello World!");
	}
}

