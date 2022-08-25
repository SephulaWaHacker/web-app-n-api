using CoreApi.Helpers;
using CoreApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SwapiController : ControllerBase
    {
        [HttpGet("people")]
        public async Task<PeopleResponse> People()
        {
            var tasks = new Tasks();
            PeopleResponse people = await tasks.GetPeople();
            return people;
        }
    }
}
