const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');
const axios = require('axios');

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  description: 'This represents a photo of a style',
  fields: () => ({
    url: { type: GraphQLString },
    thumbnail_url: { type: GraphQLString },
  }),
});

const SkuType = new GraphQLObjectType({
  name: 'Sku',
  description: 'This represents a sku of a style',
  fields: () => ({
    size: { type: GraphQLString },
    sku_id: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  }),
});

const StyleType = new GraphQLObjectType({
  name: 'Style',
  description: 'This represents a style of a product',
  fields: () => ({
    style_id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    original_price: { type: GraphQLString },
    sale_price: { type: GraphQLString },
    default: { type: GraphQLBoolean },
    photos: { type: new GraphQLList(PhotoType) },
    skus: { type: new GraphQLList(SkuType) },
  }),
});

const StylesType = new GraphQLObjectType({
  name: 'Styles',
  description: 'This represents a list of styles of a product',
  fields: () => ({
    product_id: { type: GraphQLString },
    results: { type: new GraphQLList(StyleType) },
  }),
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'This represents a product',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    slogan: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    default_price: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    styles: {
      type: StylesType,
      resolve: async (parent) => {
        const styles = await axios.get(`${process.env.BASEURL}/api/products/${parent.id}/styles`);
        return styles.data;
      },
    },
  }),
});

const ProductsType = new GraphQLObjectType({
  name: 'Products',
  description: 'This represents a list of products',
  fields: () => ({
    results: { type: new GraphQLList(ProductType) },
    pageToken: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    product: {
      type: ProductType,
      description: 'A single product',
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const product = await axios.get(`${process.env.BASEURL}/api/products/${args.id}`);
        return product.data;
      },
    },
    products: {
      type: ProductsType,
      description: 'List of products',
      args: {
        pageSize: { type: GraphQLInt },
        pageToken: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const products = await axios.get(
          `${process.env.BASEURL}/api/products?pageSize=${args.pageSize}&pageToken=${args.pageToken}`
        );
        return products.data;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = schema;
