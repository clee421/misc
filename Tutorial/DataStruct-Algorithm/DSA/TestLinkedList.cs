using System;

namespace DSA
{
  public class TestLinkedList
  {
    public TestLinkedList()
    {
    }

    public void run()
    {
      LinkedList<int> linkedList = new LinkedList<int>();

      for (int i = 1; i <= 3; i++) {
        linkedList.addFirst(i);
      }

      linkedList.printList();
      System.Console.WriteLine(linkedList.Count);

      LinkedList<double> linkedList2 = new LinkedList<double>();

      for (double i = 1.1; i < 1.4; i += 0.1) {
        linkedList2.addLast( i );
      }

      linkedList2.printList();
      System.Console.WriteLine(linkedList2.Count);

      for (int i = 0; i < 4; i++) {
        linkedList.removeFirst();
        linkedList.printList();
      }

      for (int i = 0; i < 4; i++) {
        linkedList2.removeLast();
        linkedList2.printList();
      }
    }
  }
}

