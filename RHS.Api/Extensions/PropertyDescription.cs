using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RHS.Api.Extensions
{
    public class PropertyDescription
    {
        public string PropertyName { get; set; }
        public string Type { get; set; }
        public bool IsPrimitive { get; set; }
        public IEnumerable<PropertyDescription> Properties { get; set; }
    }
}