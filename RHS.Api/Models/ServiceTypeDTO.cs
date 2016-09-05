using Fancy.SchemaFormBuilder.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RHS.Api.Models
{
    public class ServiceTypeDTO
    {
        [FormTitle("ID")]
        [FormRequired]
        [FormSection("Name")]
        [FormDisplay(DisplayWidth = DisplayWidth.Half)]
        public int ServiceTypeID { get; set; }
        [FormTitle("Descripcion")]
        public string Description { get; set; }
        [FormTitle("Activo")]
        public bool Active { get; set; }
    }
}