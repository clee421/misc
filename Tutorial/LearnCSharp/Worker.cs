using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnCSharp
{
    public class Worker : Employee
    {
        public double HourlyWage { get; set; }

        public Worker(string name, double wage)
            :base(name)
        {
            HourlyWage = wage;
        }

        public override void TakeVacation()
        {
            vacationDays += 10;
        }

        public override string ToString()
        {
            return $"Worker: Name = {Name}, Hourly Wage = ${HourlyWage}, Vacation = {vacationDays}";
        }
    }
}
