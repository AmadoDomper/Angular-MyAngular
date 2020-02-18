using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MiAngular.Models;
using MiAngular.Models.Response;
using MiAngular.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MiAngular.Controllers
{
    [Route("api/[Controller]")]
    public class ChatController : Controller
    {
        private Models.MyDbContext db;

        public ChatController(Models.MyDbContext context)
        {
            db = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<MessageViewModel> Message()
        {
            List<MessageViewModel> lst = (from d in db.Message
                                          orderby d.Id descending
                                          select new MessageViewModel
                                          {
                                              Id = d.Id,
                                              Name = d.Name,
                                              Text = d.Text
                                          }).ToList();
            return lst;
        }

        [HttpPost("[Action]")]
        public MyResponse Add([FromBody]MessageViewModel model)
        {
            MyResponse oResponse = new MyResponse();
            try
            {
                Message oMessage = new Message();
                oMessage.Name = model.Name;
                oMessage.Text = model.Text;
                db.Message.Add(oMessage);
                db.SaveChanges();

                oResponse.Success = 1;
            }
            catch (Exception ex)
            {
                oResponse.Success = 0;
                oResponse.Message = ex.Message;
            }
            return oResponse;
        }
    }
}