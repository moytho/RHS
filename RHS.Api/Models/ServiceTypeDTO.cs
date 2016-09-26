using Fancy.SchemaFormBuilder.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RHS.Api.Models
{
    public class ServiceTypeDTO
    {
        /*[FormTitle("ID")]
        [FormRequired]
        [FormSection("Name")]
        [FormDisplay(DisplayWidth = DisplayWidth.Half)]*/
        public int ServiceTypeID { get; set; }
        
        /*[FormTitle("Descripcion")]
        [FormRequired]
        [FormSection("Name")]
        [FormDisplay(DisplayWidth = DisplayWidth.Half)]*/
        [Required]
        public string Description { get; set; }
        
        /*[FormTitle("Activo")]
        [FormRequired]
        [FormSection("Name")]
        [FormDisplay(DisplayWidth = DisplayWidth.Half)]*/
        public bool Active { get; set; }
    }
}