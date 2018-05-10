using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManager.Data
{
    public class DataRepository
    {
        private dbEntities dataContext = new dbEntities();
        public List<AssetHistory> GetAll()
        {
            var query = (from row in dataContext.AssetHistories
                         select row).ToList();

            return query;
        }

        public AssetHistory GetByid(int id)
        {
            var query = (from row in dataContext.AssetHistories
                         where row.ID == id
                         select row).FirstOrDefault();

            return query;
        }

        public AssetHistory AddItem(AssetHistory item)
        {
            dataContext.AssetHistories.Add(item);
            dataContext.SaveChanges();

            return item;
        }

        public void RemoveItem(int id)
        {
            var dataObject = (from row in dataContext.AssetHistories
                              where row.ID == id
                              select row).FirstOrDefault();

            if (dataObject == null)
                throw new InvalidOperationException("Entry could not be found.");

            dataContext.AssetHistories.Remove(dataObject);
        }

        public AssetHistory UpdateItem(AssetHistory item)
        {
            var existingObject = (from row in dataContext.AssetHistories
                              where row.ID == item.ID
                              select row).FirstOrDefault();

            if(existingObject != null)
            {
                dataContext.Entry(existingObject).CurrentValues.SetValues(item);
                dataContext.SaveChanges();
                return item;
            }

            else
            {
                throw new InvalidOperationException("Entry could not be found.");
            }
        }
    }
}
