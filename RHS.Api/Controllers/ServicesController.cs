using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RHS.Api.Models;
using RHS.Api.DAL;

namespace RHS.Api.Controllers
{
    public class ServicesController : ApiController
    {
        private RHSEntities db = new RHSEntities();

        // GET api/Services
        private IServiceRepository serviceRepository;

        public ServicesController()
        {
          this.serviceRepository = new ServiceRepository(new RHSEntities());
        }

        public ServicesController(IServiceRepository studentRepository)
        {
            this.serviceRepository = studentRepository;
        }
        public IHttpActionResult GetServices()
        {
            //return db.Services;
            IEnumerable<Service> services=  serviceRepository.GetServices();
            services.Where(c => c.Active == true).Skip(2).Take(2);
            return Ok(services);
        }

        // GET api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult GetService(int id)
        {
            Service service = serviceRepository.GetServiceByID(id);
            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        // PUT api/Services/5
        public IHttpActionResult PutService(int id, Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != service.ServiceID)
            {
                return BadRequest();
            }

            //db.Entry(service).State = EntityState.Modified;
            serviceRepository.UpdateService(service);
            serviceRepository.Save();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Services
        [ResponseType(typeof(Service))]
        public IHttpActionResult PostService(Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //db.Services.Add(service);
            //db.SaveChanges();
            serviceRepository.InsertService(service);
            serviceRepository.Save();

            return CreatedAtRoute("DefaultApi", new { id = service.ServiceID }, service);
        }

        // DELETE api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult DeleteService(int id)
        {
            Service service = db.Services.Find(id);
            if (service == null)
            {
                return NotFound();
            }
            serviceRepository.DeleteService(id);
            serviceRepository.Save();
            //db.Services.Remove(service);
            //db.SaveChanges();

            return Ok(service);
        }

        protected override void Dispose(bool disposing)
        {
            serviceRepository.Dispose();
            /*if (disposing)
            {
                db.Dispose();
            }*/
            base.Dispose(disposing);
        }

        private bool ServiceExists(int id)
        {
            return db.Services.Count(e => e.ServiceID == id) > 0;
        }
    }
}