using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using CMS;
using CMS.MacroEngine;
using CMS.Helpers;

//// Makes all methods in the 'CustomMacroMethods' container class available for string objects
//[assembly: RegisterExtension(typeof(CustomMacros), typeof(string))]
//// Registers methods from the 'CustomMacroMethods' container into the "String" macro namespace
//[assembly: RegisterExtension(typeof(CustomMacros), typeof(StringNamespace))]

///// <summary>
///// Summary description for CustomMacros
///// </summary>
//public class CustomMacros : MacroMethodContainer
//{
//    [MacroMethod(typeof(string), "This is my test macro. It just returns something as a string.", 0)]
//    public static object TestMacro(EvaluationContext content, params object[] parameters)
//    {
//        return "Hi";
//    }
//    //public CustomMacros()
//    //{
//    //    //
//    //    // TODO: Add constructor logic here
//    //    //
//    //}
//}

// Makes all methods in the 'CustomMacroMethods' container class available for string objects
[assembly: RegisterExtension(typeof(CustomMacroMethods), typeof(string))]
// Registers methods from the 'CustomMacroMethods' container into the "String" macro namespace
[assembly: RegisterExtension(typeof(CustomMacroMethods), typeof(StringNamespace))]

public class CustomMacroMethods : MacroMethodContainer
{
    [MacroMethod(typeof(string), "Combines two strings, or appends a culture suffix when called with one parameter.", 1)]
    [MacroMethodParam(0, "param1", typeof(string), "First part of the string.")]
    [MacroMethodParam(1, "param2", typeof(string), "Second part of the string (optional).")]
    public static object ConnectStrings(EvaluationContext context, params object[] parameters)
    {
        // Branches according to the number of the method's parameters
        switch (parameters.Length)
        {
            case 1:
                // Overload with one parameter
                return ValidationHelper.GetString(parameters[0], "") + " - Resolved in culture: " + context.Culture;

            case 2:
                // Overload with two parameters
                return ValidationHelper.GetString(parameters[0], "") + " - " + ValidationHelper.GetString(parameters[1], "");

            default:
                // No other overloads are supported
                throw new NotSupportedException();
        }
    }
}