using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RHS.Api.Models
{
    public class ServiceTypeDTO
    {
        public int ServiceTypeID { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
    }
}