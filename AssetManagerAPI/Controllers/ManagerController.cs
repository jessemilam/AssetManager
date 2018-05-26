using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AssetManager.BusinessLogic;
using AssetManager.Data;

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

        [Route("api/addItem")]
        public IHttpActionResult AddItem([FromBody]AssetHistory item)
        {
            if (item == default(AssetHistory))
                return BadRequest("Invalid request. No item could be found.");

            var logic = new AssetManagerLogic();
            return Ok(logic.AddItem(item));
        }

        [Route("api/removeItem/{id}")]
        public IHttpActionResult RemoveItem(int id)
        {
            if (id == default(int))
                return BadRequest("Invalid request. No item could be found.");

            var logic = new AssetManagerLogic();
            logic.RemoveItem(id);
            return Ok();
        }

        [Route("api/checkInItem/{id}")]
        public IHttpActionResult CheckInItem(int id)
        {
            if (id == default(int))
                return BadRequest("Invalid item specified.");

            var logic = new AssetManagerLogic();
            try
            {
                logic.CheckInItem(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("api/updateItem")]
        public IHttpActionResult UpdateItem([FromBody]AssetHistory item)
        {
            if (item.ID == default(int))
                return BadRequest("Invalid item specified.");

            if (!DateTime.TryParse(item.CheckedOutDate.ToString(), out DateTime outParse) || item.CheckedOutDate.Year == 0001)
            {
                return BadRequest("Invalid check out date specified.");
            }

            var logic = new AssetManagerLogic();
            try
            {
                return Ok(logic.UpdateItem(item));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
