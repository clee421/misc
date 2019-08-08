using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnCSharp
{
    class Sort
    {
        public static List<int> BubbleSort(List<int> list)
        {
            bool sorted = false;
            while (!sorted)
            {
                sorted = true;
                for (int i = 0; i < (list.Count - 1); i++)
                {
                    if (list[i] > list[i + 1])
                    {
                        int temp = list[i];
                        list[i] = list[i + 1];
                        list[i + 1] = temp;
                        sorted = false;
                    }
                }
            }
            return list;
        }

        public static List<int> QuickSort(List<int> list)
        {
            if (list.Count <= 1)
            {
                return list;
            }
            int first = list[0];
            List<int> left = new List<int>();
            List<int> right = new List<int>();

            for (int i = 1; i < list.Count; i++)
            {
                if (list[i] < first)
                {
                    left.Add(list[i]);
                }
                else
                {
                    right.Add(list[i]);
                }
            }
            left = QuickSort(left);
            right = QuickSort(right);
            left.Add(first);

            return left.Concat(right).ToList();
        }
    }
}
