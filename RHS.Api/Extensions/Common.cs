using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RHS.Api.Extensions
{
    public static class Common
    {
        public static List<PropertyDescription> ReadObject(Type type)
{
    var propertyDescriptions = new List<PropertyDescription>();
    foreach (var propertyInfo in type.GetProperties())
    {
        var propertyDescription = new PropertyDescription
        {
            PropertyName = propertyInfo.Name,
            Type = propertyInfo.PropertyType.Name
        };

        if (!propertyDescription.IsPrimitive
            // String is not a primitive type
            && propertyInfo.PropertyType != typeof (string))
        {
            propertyDescription.IsPrimitive = false;
            propertyDescription.Properties = ReadObject(propertyInfo.PropertyType);
        }
        else
        {
            propertyDescription.IsPrimitive = true;            
        }
        propertyDescriptions.Add(propertyDescription);
    }

    return propertyDescriptions;
}
    }
}