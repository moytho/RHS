//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RHS.Api.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ServiceType
    {
        public ServiceType()
        {
            this.Services = new HashSet<Service>();
        }
    
        public int ServiceTypeID { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
    
        public virtual ICollection<Service> Services { get; set; }
    }
}
