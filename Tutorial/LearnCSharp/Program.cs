using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnCSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            //GradeBook book = new GradeBook();
            //book.AddGrade(91);
            //book.AddGrade(89.5f);
            //book.AddGrade(32.3f);
            //book.AddGrade(54);
            //book.AddGrade(89.23f);
            //book.AddGrade(33);

            //GradeStatistic stats = book.computeStatistic();

            //Console.WriteLine("Highest Score: " + stats.highestScore.ToString());
            //Console.WriteLine("Lowest Score: " + stats.lowestScore.ToString());
            //Console.WriteLine("Average Score: " + stats.averageScore.ToString());

            //List<int> numList = new List<int>();
            //for (int i = 0; i < 5; i++)
            //{
            //    numList.Add(i);
            //}

            //Enumerable.MyEach(numList, Add);

            //List<int> unsortedList = new List<int>();
            //Random rnd = new Random();
            //for (int i = 0; i < 5; i++)
            //{
            //    unsortedList.Add(rnd.Next(1, 10));      
                    
            //}

            //Sort.BubbleSort(unsortedList);
            //unsortedList.ForEach(i => Console.WriteLine("{0}\t", i));

            //Sort.QuickSort(unsortedList).ForEach(i => Console.WriteLine("{0}\t", i));

            Employee steve = new Manager("steve", 100000, true);
            Employee jack = new Worker("jack", 9.75);
            Employee sally = new Worker("sally", 8.15);

            List<Employee> employeeList = new List<Employee>();
            employeeList.Add(steve);
            employeeList.Add(jack);
            employeeList.Add(sally);

            for(int i = 0; i < employeeList.Count; i++)
            {
                employeeList[i].TakeVacation();
                Console.WriteLine(employeeList[i]);
            }

        }
        // Test for MyEach
        public static void Add(int x)
        {
            Console.WriteLine(x);
        }
    }
}
