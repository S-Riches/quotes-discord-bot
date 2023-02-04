const { Client } = require("craiyon");

describe("craiyon ai testing", () => {
    let testReturnData = "";
    beforeAll(async () => {
        console.log("api call being made, takes up to 2 minutes - sorry :(");
        const craiyon = new Client();
        testReturnData = await craiyon.generate({
            prompt: "test",
        });
    }, 120000);
    test("the api is returning base64 values", () => {
        expect(testReturnData._images[0].base64).not.toBeUndefined();
    });
});
