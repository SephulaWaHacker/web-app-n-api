using CoreApi.Helpers;
using CoreApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChuckController : ControllerBase
    {
        [HttpGet("categories")]
        public async Task<List<string>> Categories()
        {
            var httpServices = new HttpServices();
            return await httpServices.GetChuckCategories();
        }

        [HttpGet("category")]
        public async Task<Chuck> Category([FromQuery(Name = "category")] string category)
        {
            var httpServices = new HttpServices();
            return await httpServices.GetChuckCategory(category);
        }
    }
}
