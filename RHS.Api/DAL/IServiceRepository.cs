using RHS.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RHS.Api.DAL
{
    public interface IServiceRepository: IDisposable
    {
        IEnumerable<Service> GetServices();
        Service GetServiceByID(int serviceId);
        void InsertService(Service service);
        void DeleteService(int serviceID);
        void UpdateService(Service service);
        void Save();
    }
}