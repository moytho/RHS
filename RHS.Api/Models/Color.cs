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
    
    public partial class Color
    {
        public Color()
        {
            this.Inventories = new HashSet<Inventory>();
        }
    
        public int ColorID { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
    
        public virtual ICollection<Inventory> Inventories { get; set; }
    }
}