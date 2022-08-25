using CoreApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CoreApi.Helpers
{
    public class Tasks
    {
        public async Task<PeopleResponse> GetPeople(string term = null)
        {
            var httpServices = new HttpServices();
            PeopleResponse people = null;
            List<Person> results = new List<Person>();
            string next = null;

            do
            {
                if (next == null)
                {
                    people = await httpServices.GetSwapiPeople(term);
                    next = people.next;
                    if (people.results != null)
                    {
                        foreach (var person in people.results)
                        {
                            results.Add(person);
                        }
                    }
                }
                else
                {
                    Uri nextUri = new Uri(next);
                    string nextPage = HttpUtility.ParseQueryString(nextUri.Query).Get("page");
                    people = await httpServices.GetSwapiPeople(term, nextPage);
                    next = people.next;
                    if (people.results != null)
                    {
                        foreach (var person in people.results)
                        {
                            results.Add(person);
                        }
                    }
                }

            } while (next != null);

            people.results = results;

            return people;
        }

    }
}
