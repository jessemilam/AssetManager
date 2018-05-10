using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AssetManager.Data;

namespace AssetManager.BusinessLogic
{
    public class AssetManagerLogic
    {
        private DataRepository logic = new DataRepository();
        public List<AssetHistory> GetAll()
        {
            return logic.GetAll();
        }

        public AssetHistory GetById(int id)
        {
            return logic.GetByid(id);
        }

        public AssetHistory AddItem(AssetHistory item)
        {
            item.CheckedOutDate = DateTime.Now;
            return logic.AddItem(item);
        }

        public void CheckInItem(int id)
        {
            var existingObject = logic.GetByid(id);
            existingObject.CheckedInDate = DateTime.Now;

            logic.UpdateItem(existingObject);
        }

        public void RemoveItem(int id)
        {
            logic.RemoveItem(id);
        }
    }
}
