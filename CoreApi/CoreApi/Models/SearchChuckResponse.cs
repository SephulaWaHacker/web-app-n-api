using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreApi.Models
{
    public class SearchChuckResponse
    {
        public string total { get; set; }
        public List<Chuck> result { get; set; }
    }
}
