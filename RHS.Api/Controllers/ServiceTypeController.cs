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
    public class ServiceTypeController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        // GET api/ServiceType
        public IEnumerable<ServiceTypeDTO> GetServiceTypes()
        {
            var serviceTypes = (from st in unitOfWork.ServiceTypeRepository.Get() 
                                where st.Active == true 
                                select new ServiceTypeDTO{
                                    Active = st.Active,
                                    Description = st.Description,
                                    ServiceTypeID = st.ServiceTypeID
                                }); 

            //serviceTypes = serviceTypes.Where(c => c.Active == true);
            return serviceTypes;
        }

        // GET api/ServiceType/5
        [ResponseType(typeof(ServiceType))]
        public IHttpActionResult GetServiceType(int id)
        {
            var servicetype = (from st in unitOfWork.ServiceTypeRepository.Get().Where(c=> c.ServiceTypeID == id) 
                               select new ServiceTypeDTO{
                               Active = st.Active,
                                    Description = st.Description,
                                    ServiceTypeID = st.ServiceTypeID
                               });
            if (servicetype == null)
            {
                return NotFound();
            }

            return Ok(servicetype);
        }

        // PUT api/ServiceType/5
        public IHttpActionResult PutServiceType(int id, ServiceType servicetype)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != servicetype.ServiceTypeID)
            {
                return BadRequest();
            }

            //db.Entry(servicetype).State = EntityState.Modified;

            try
            {
                //db.SaveChanges();
                servicetype.Active = true;
                unitOfWork.ServiceTypeRepository.Update(servicetype);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/ServiceType
        [ResponseType(typeof(ServiceType))]
        public IHttpActionResult PostServiceType(ServiceType servicetype)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //db.ServiceTypes.Add(servicetype);
            servicetype.Active = true;
            unitOfWork.ServiceTypeRepository.Insert(servicetype);
            unitOfWork.Save();
            //db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = servicetype.ServiceTypeID }, servicetype);
        }

        // DELETE api/ServiceType/5
        [ResponseType(typeof(ServiceType))]
        public IHttpActionResult DeleteServiceType(int id)
        {
            ServiceType servicetype = unitOfWork.ServiceTypeRepository.GetByID(id);
            if (servicetype == null)
            {
                return NotFound();
            }
            servicetype.Active = false;

            unitOfWork.ServiceTypeRepository.Update(servicetype);
            unitOfWork.Save();

            return Ok(servicetype);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ServiceTypeExists(int id)
        {
            if (unitOfWork.ServiceTypeRepository.GetByID(id) != null) return true;
            return false;
            //return db.ServiceTypes.Count(e => e.ServiceTypeID == id) > 0;
        }
    }
}