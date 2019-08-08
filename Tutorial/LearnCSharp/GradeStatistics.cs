using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnCSharp
{
    class GradeStatistic
    {
        public GradeStatistic()
        {
            highestScore = float.MinValue;
            lowestScore = float.MaxValue;
            averageScore = 0;
        }

        public float highestScore;
        public float lowestScore;
        public float averageScore;
    }
}
