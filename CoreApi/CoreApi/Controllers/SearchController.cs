using CoreApi.Models;
using CoreApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<Search> Get([FromQuery(Name = "term")] string term)
        {
            PeopleResponse people = null;
            SearchChuckResponse categories = null;
            var tasks = new Tasks();
            var httpServices = new HttpServices();

            try
            {
                people = await tasks.GetPeople(term);
                categories = await httpServices.SearchChuckItems(term);
            }
            catch (Exception e)
            {

                throw;
            }

            return new Search { StarWarsResults = people.results, ChuckNorrisResults = null };
        }
    }
}
