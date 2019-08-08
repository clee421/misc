using System;
using System.Collections.Generic;

namespace DSA
{
  public class PostfixCalculator
  {
    public PostfixCalculator()
    {
    }

    public int calculate(string[] postfixInput)
    {
      Stack<int> values = new Stack<int>();

      foreach (string token in postfixInput) {
        int value;
        if (int.TryParse( token, out value )) {
          values.Push( value );
        } else {
          int rhs = values.Pop();
          int lhs = values.Pop();

          switch (token) {
          case "+":
            values.Push( lhs + rhs );
            break;
          case "-":
            values.Push( lhs - rhs );
            break;
          case "*":
            values.Push( lhs * rhs );
            break;
          case "/":
            values.Push( lhs / rhs );
            break;
          case "%":
            values.Push( lhs % rhs );
            break;
          default:
            throw new ArgumentException( string.Format( "Unrecognized token: {0}", token ) );
          }
        }
      }
      return values.Pop();
    }
  }
}

