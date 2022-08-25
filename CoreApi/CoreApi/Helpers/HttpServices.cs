using CoreApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using System.Net.Http.Headers;
using System.Net;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Reflection;
using System.Configuration;
using Newtonsoft.Json;

namespace CoreApi.Helpers
{
    public class HttpServices
    {
        public string ChuckBaseUrl { get; } = "https://api.chucknorris.io/jokes/";
        public string SwapiBaseUrl { get; } = "https://swapi.dev/api/people/";



        public async Task<TResponse> InvokeClient<TResponse>(string url)
        {
            try
            {
                HttpResponseMessage response = null;
                response = await sendHttpRequestAsync(HttpMethod.Get, url);

                var responseString = await response.Content.ReadAsStringAsync();

                TResponse retVal =  DeserialiseResponse<TResponse>(responseString, response);

                PropertyInfo errors = retVal.GetType().GetProperty("Errors");
                if (errors?.GetValue(retVal) != null)
                {
                    throw new Exception("Something went wrong", new Exception{ Source = responseString});
                }

                return retVal;
            }
            catch (Exception)
            {
                throw;
            }

        }
        internal T DeserialiseResponse<T>(string responseString, HttpResponseMessage response)
        {

            using (var sr = new StringReader(responseString))
            {
                using (var jr = new JsonTextReader(sr))
                {
                    var jsonSerialize = new JsonSerializer();
                    var retVar = jsonSerialize.Deserialize<T>(jr);
                    var status = retVar.GetType().GetProperty("HttpStatus");
                    if (status != null)
                    {
                        status.SetValue(retVar, response.StatusCode);
                    }
                    return retVar;
                }
            }
        }

        private async Task<HttpResponseMessage> sendHttpRequestAsync(HttpMethod method, string url)
        {
            if (method == null) return null;
            if(string.IsNullOrEmpty(url)) return null;

            var uri = new Uri(url);
            var request = new HttpRequestMessage(method, uri);

            try
            {
                var httpClient = new HttpClient();
                return await httpClient.SendAsync(request);
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<List<string>> GetChuckCategories()
        {
            var url = ChuckBaseUrl + "categories";
            return await InvokeClient<List<string>>(url);
        }

        public async Task<Chuck> GetChuckCategory(string category)
        {
            var url = ChuckBaseUrl + $"random?category={category}";
            return await InvokeClient<Chuck>(url);
        }
        public async Task<SearchChuckResponse> SearchChuckItems(string searchTerm)
        {
            var url = ChuckBaseUrl + $"search?query={searchTerm}";
            return await InvokeClient<SearchChuckResponse>(url);
        }

        public async Task<PeopleResponse> GetSwapiPeople(string searchTerm = null, string page = null)
        {
            string url = SwapiBaseUrl;
            if (page != null) url = SwapiBaseUrl + $"?page={page}";
            if (searchTerm != null) url = SwapiBaseUrl + $"?search={searchTerm}" + (page != null ? $"&page={page}" : "");
            return await InvokeClient<PeopleResponse>(url);
        }
    }
}
