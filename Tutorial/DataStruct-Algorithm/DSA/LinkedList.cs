using System;

namespace DSA
{
	public class LinkedList<T> : 
		System.Collections.Generic.ICollection<T>
//	The ICollection<T> interface is the base interface for classes in the System.Collections.Generic namespace.

//	The ICollection<T> interface extends IEnumerable<T>; IDictionary<TKey, TValue> and IList<T> are more 
//	specialized interfaces that extend ICollection<T>. A IDictionary<TKey, TValue> implementation is a
//	collection of key/value pairs, like the Dictionary<TKey, TValue> class. A IList<T> implementation is 
//	a collection of values, and its members can be accessed by index, like the List<T> class.

//	If neither the IDictionary<TKey, TValue> interface nor the IList<T> interface meet the requirements 
//	of the required collection, derive the new collection class from the ICollection<T> interface instead for more flexibility.
	{
    public LinkedListNode<T> Head
    {
    	get;
    	private set;
    }

    public LinkedListNode<T> Tail 
    {
      get;
      private set;
    }

    public int Count
    {
      get;
      private set;
    }

    public bool IsReadOnly
    {
      get { return false; }
    }

    public void Add(T item)
    {

    }

    public bool Remove(T item)
    {
        return true;
    }

    public void Clear()
    {
      Head = null;
      Tail = null;
      Count = 0;
    }

    public bool Contains(T item)
    {
      return true;
    }

    public void CopyTo(T[] array, int arrayIndex)
    {

    }

    System.Collections.Generic.IEnumerator<T> System.Collections.Generic.IEnumerable<T>.GetEnumerator()
    {
      LinkedListNode<T> current = Head;
      yield return current.Value;
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
    {
      return ((System.Collections.Generic.IEnumerable<T>)this).GetEnumerator();
    }

    public void printList()
    {   
      LinkedListNode<T> current = Head;
      while (current != null) {
          System.Console.Write(current.Value);
          current = current.Next;
      }
      System.Console.WriteLine("");
    }

    public void addFirst(LinkedListNode<T> node)
    {
      LinkedListNode<T> temp = Head;
      Head = node;
      Head.Next = temp;

      Count++;
      if (Count == 1) {
        Tail = Head;
      }
    }

    public void addFirst(T value)
    {
      addFirst( new LinkedListNode<T>(value) );
    }

    public void addLast(LinkedListNode<T> node)
    {
      if (Count == 0) {
        Head = node;
      } else {
        Tail.Next = node;
      }

      Tail = node;
      Count++;
    }

    public void addLast(T value)
    {
      addLast( new LinkedListNode<T>(value) );
    }

    public void removeFirst()
    {
      if (Head != null) {
        Head = Head.Next;
        Count--;
      }

      if (Count == 0) {
        Tail = null;
      }
    }

    public void removeLast() {
      if (Count != 0) {
        if (Count == 1) {
          Head = null;
          Tail = null;
        } else {
          LinkedListNode<T> current = Head;
          while (current.Next != Tail) {
            current = current.Next;
          }
          current.Next = null;
          Tail = current;
        }
        Count--;
      }
    }
	}
}

