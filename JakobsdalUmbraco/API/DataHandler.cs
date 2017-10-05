using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Umbraco;
using Umbraco.Core.Services;
using Umbraco.Web;
using Umbraco.Web.WebApi;
using Our.Umbraco.Ditto;

namespace JakobsdalUmbraco.API
{    
    public class DataHandlerController:UmbracoApiController
    {
        public string GetTemplates()
        {
            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var myTestContent=umbracoHelper.TypedContent(1081);
            return "Hej";
        }
        [Route("Umbraco/Api/DataHandler/GetProducts/CategoryId")]
        public List<ProductDetails> GetProducts(int categoryId)
        {
            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var myTestContent = umbracoHelper.TypedContent(categoryId);
            var productsInCategory = myTestContent.Children().ToList().As<ProductDetails>().ToList();
            return productsInCategory;
        }
      
    }
    public class ProductDetails
    {
        public ProductDetails()
        {

        }
        public string detailedText { get; set; }
        public string maintext { get; set; }
        public string energy { get; set; }
        public string Fat { get; set; }
        public string protein { get; set; }
        public string carbs { get; set; }
        public string salt { get; set; }
        public string saturatedFat { get; set; }
        public string whereSugars { get; set; }
        public int id { get; set; }
    }
}