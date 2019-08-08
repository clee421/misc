using System;

namespace DSA
{
	public class LinkedListNode<T>
	{
		public T Value { get; set; }
		public LinkedListNode<T> Next { get; set; }

		public LinkedListNode(T value)
		{
			Value = value;
		}
	}
}

