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
    public class DataHandlerController : UmbracoApiController
    {

        [Route("Umbraco/Api/DataHandler/GetProducts/CategoryId")]
        public List<ProductDetails> GetProducts(int categoryId)
        {
            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var myTestContent = umbracoHelper.TypedContent(categoryId);
            var productsInCategory = myTestContent.Children().ToList().As<ProductDetails>().ToList();
            return productsInCategory;
        }
        [Route("Umbraco/Api/DataHandler/GetProductCategories")]
        public string GetProductCategories()
        {
            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            var productCategories = umbracoHelper.TypedContentAtRoot().Where(tc => tc.DocumentTypeAlias == "produktCategory").Select(pc =>
           
            new JDPublishedContent
            {
                Children = pc.Children.Select(c => new JDPublishedContent
                {
                    Children = null,
                    CreateDate = c.CreateDate,
                    CreatorId = c.CreatorId,
                    CreatorName = c.CreatorName,
                    DocumentTypeAlias = c.DocumentTypeAlias,
                    Id = c.Id,
                    IsDraft = c.IsDraft,
                    Name = c.Name,
                    Parent = null,
                    Properties = c.Properties.Select(p => new JDProperty
                    {
                        DataValue = p.PropertyTypeAlias == "pictures" ? p.GetValue<Umbraco.Core.Models.IPublishedContent>().Url : p.DataValue,
                        HasValue = p.HasValue,
                        PropertyTypeAlias = p.PropertyTypeAlias,
                        Value = p.Value as JDProperty
                    }),
                    SortOrder = c.SortOrder,
                    TemplateId = c.TemplateId,
                    Url = c.Url
                }).ToList(),

                CreateDate = pc.CreateDate,
                CreatorId = pc.CreatorId,
                CreatorName = pc.CreatorName,
                DocumentTypeAlias = pc.DocumentTypeAlias,
                Id = pc.Id,
                IsDraft = pc.IsDraft,
                Name = pc.Name,
                Parent = null,
                Properties = pc.Properties.Select(p => new JDProperty
                {
                    DataValue = p.PropertyTypeAlias=="picture"? p.GetValue<Umbraco.Core.Models.IPublishedContent>().Url: p.DataValue,
                    HasValue = p.HasValue,
                    PropertyTypeAlias = p.PropertyTypeAlias,
                    Value = p.Value as JDProperty
                }),
                SortOrder = pc.SortOrder,
                TemplateId = pc.TemplateId,
                Url = pc.Url
            }).ToList();
           
            var categoryList = new ListProductCategories { CategoryList = productCategories };

            return JsonConvert.SerializeObject(categoryList);
            
        }

    }

    class ListProductCategories
    {
        public List<JDPublishedContent> CategoryList { get; set; }
    }

    class JDProperty
    {
        
        public object DataValue { get; set; }
        public bool HasValue { get; set; }
        public string PropertyTypeAlias { get; set; }
        public JDProperty Value { get; set; }

    }

    class JDPublishedContent
    {
        public List<JDPublishedContent> Children { get; set; }
        public DateTime CreateDate { get; set; }
        public int CreatorId { get; set; }
        public string CreatorName { get; set; }
        public string DocumentTypeAlias { get; set; }
        public int Id { get; set; }
        public bool IsDraft { get; set; }
        public string Name { get; set; }
        public JDPublishedContent Parent { get; set; }
        public IEnumerable<JDProperty> Properties { get; set; }
        public int SortOrder { get; set; }
        public int TemplateId { get; set; }
        public string Url { get; set; }
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