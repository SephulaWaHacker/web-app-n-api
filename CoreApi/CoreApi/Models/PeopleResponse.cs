using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreApi.Models
{
    public class PeopleResponse
    {
        public string count { get; set; }
        public string next { get; set; }
        public string previous { get; set; }
        public List<Person> results { get; set; }
    }
}
