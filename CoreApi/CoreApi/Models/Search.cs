using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreApi.Models
{
    public class Search
    {
        public List<Person> StarWarsResults { get; set; }
        public List<Chuck> ChuckNorrisResults { get; set; }
    }

    public class Chuck
    {
        public List<string> categories { get; set; }
        public string created_at { get; set; }
        public string icon_url { get; set; }
        public string id { get; set; }
        public string update_at { get; set; }
        public string url { get; set; }
        public string value { get; set; }
    }
}
