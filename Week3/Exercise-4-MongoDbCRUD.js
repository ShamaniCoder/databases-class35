const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://hyfuser:hyfpassword@cluster0.8inhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const seedDatabase = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const database = client.db("hyf");
  const city = database.collection("city");
  try {
    await client.connect();

    //Insert Operation

    const homeTown = {
      Name: "New Home Town",
      CountryCode: "NHT",
      District: "New Home Town",
      Population: "350000",
    };
    const insertResult = await city.insertOne(homeTown);
    console.log(
      `A document was inserted with the _id: ${insertResult.insertedId}`
    );

    //Update Operation

    const filter = { Name: "New Home Town" };
    const updateHomeTown = {
      $set: {
        Population: 380000,
      },
    };
    const result = await city.updateOne(filter, updateHomeTown);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    //Retrieve Operation

    const getByNameQuery = { Name: "New Home Town" };
    const homeTownByName = await city.findOne(getByNameQuery);
    console.log(homeTownByName);

    const getByCountryCodeQuery = { CountryCode: "NHT" };
    const homeTownByCountryCode = await city.findOne(getByCountryCodeQuery);
    console.log(homeTownByCountryCode);

    //Delete Operation

    const deleteQuery = { Name: "New Home Town" };
    const deleteResult = await city.deleteOne(deleteQuery);
    if (deleteResult.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

seedDatabase();
