using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.BusinessLogic;

namespace AssetManagerAPI.Controllers
{
    public class ManagerController : ApiController
    {
        [Route("api/getHistory")]
        public IHttpActionResult GetHistory()
        {
            var logic = new AssetManagerLogic();
            return Ok(logic.GetAll());
        }

        [Route("api/getHistory/{id}")]
        public IHttpActionResult GetHistoryById(int id)
        {
            var logic = new AssetManagerLogic();
            return Ok(logic.GetById(id));
        }
    }
}
