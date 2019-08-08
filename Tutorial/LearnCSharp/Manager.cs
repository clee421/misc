using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnCSharp
{
    class Manager : Employee
    {
        public int Salary { get; set; } 
        public bool CompanyCar { get; set; }

        public Manager(string name, int salary, bool car)
            : base(name)
        {
            Salary = salary;
            CompanyCar = car;
        }

        public override void TakeVacation()
        {
            vacationDays += 15;
        }

        public override string ToString()
        {
            return $"Manager: Name = {Name}, Salary = ${Salary}, Company Car = {CompanyCar}";
        }
    }
}
