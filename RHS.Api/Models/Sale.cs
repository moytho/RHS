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
    
    public partial class Sale
    {
        public Sale()
        {
            this.SaleItems = new HashSet<SaleItem>();
        }
    
        public int SaleID { get; set; }
        public int EmployeeID { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public System.DateTime CreationDate { get; set; }
        public string Notes { get; set; }
        public decimal Total { get; set; }
    
        public virtual Customer Customer { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual ICollection<SaleItem> SaleItems { get; set; }
    }
}