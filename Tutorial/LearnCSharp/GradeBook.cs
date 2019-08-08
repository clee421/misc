using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnCSharp
{
    class GradeBook
    {
        public GradeBook()
        {
            grades = new List<float>();
        }

        public void AddGrade(float grade)
        {
            grades.Add(grade);
        }

        public GradeStatistic computeStatistic()
        {
            GradeStatistic stats = new GradeStatistic();

            if (grades.Count == 0) return stats;

            float sum = 0;
            foreach (float grade in grades)
            {
                stats.highestScore = Math.Max(grade, stats.highestScore);
                stats.lowestScore = Math.Min(grade, stats.lowestScore);
                sum += grade;
            }

            stats.averageScore = sum / grades.Count;

            return stats;
        }

        List<float> grades;
    }
}
