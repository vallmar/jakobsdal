using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Umbraco;
using Umbraco.Core.Services;
using Umbraco.Web;
using Umbraco.Web.WebApi;

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
    }
}