using RHS.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RHS.Api.DAL
{
    public class ServiceRepository : IServiceRepository, IDisposable
    {
        private RHSEntities context;
        public ServiceRepository(RHSEntities context)
        {
            this.context = context;
        }
        public IEnumerable<Service> GetServices()
        {
            return context.Services.ToList();
        }
        public Service GetServiceByID(int id)
        {
            return context.Services.Find(id);
        }

        public void InsertService(Service service)
        {
            context.Services.Add(service);
        }

        public void DeleteService(int serviceID)
        {
            Service service = context.Services.Find(serviceID);
            context.Entry(service).State = EntityState.Modified;

            //context.Services.Remove(service);
        }

        public void UpdateService(Service service)
        {
            context.Entry(service).State = EntityState.Modified;
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}