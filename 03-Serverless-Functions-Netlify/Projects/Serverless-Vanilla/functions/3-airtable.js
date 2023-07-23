require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("apputxD5AdfYge7jb")
  .table("products");

exports.handler = async (event, context, cb) => {
  try {
    const { records } = await airtable.list();
    console.log("records");
    console.log(records[0].fields);
    console.log("records end");

    const products = records.map((product) => {
      const { id } = product;
      const { name, image, price, decs } = product.fields;
      const url = image[0].url;
      return { id, name, url, price, decs };
    });
    console.log(products);
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
