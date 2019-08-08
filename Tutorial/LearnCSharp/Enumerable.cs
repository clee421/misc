using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnCSharp
{
    class Enumerable
    {
        public static List<int> MyEach(List<int> list, Action<int> callback)
        {
            for (int i = 0; i < list.Count; i++)
            {
                callback(list[i]);
            }
            return list;
        }
    }
}
