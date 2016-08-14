using RHS.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RHS.Api.DAL
{
    public class UnitOfWork : IDisposable
    {
        private RHSEntities context = new RHSEntities();
        private GenericRepository<Service> serviceRepository;
        private GenericRepository<ServiceType> serviceTypeRepository;

        public GenericRepository<Service> ServiceRepository
        {
            get
            {

                if (this.serviceRepository == null)
                {
                    this.serviceRepository = new GenericRepository<Service>(context);
                }
                return serviceRepository;
            }
        }

        public GenericRepository<ServiceType> ServiceTypeRepository
        {
            get
            {

                if (this.serviceTypeRepository == null)
                {
                    this.serviceTypeRepository = new GenericRepository<ServiceType>(context);
                }
                return serviceTypeRepository;
            }
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