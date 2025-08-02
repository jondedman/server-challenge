const {deleteGigRequest} = require("./fetchGigFunctions");

// 	/gigs/:id	DELETE	Not applicable	
// {"message": "Successfully deleted gig", "gigs":
//  [All gigs minus deleted one based on id]}
describe("/gigs/:id", () => {
    it("returns a confirmation when the gig is deleted", async ()=>{
        const response = await deleteGigRequest(2);
        expect(response.message).toBe("Successfully deleted gig");
    });
})