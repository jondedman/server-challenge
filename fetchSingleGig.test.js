const {fetchGigById} = require("./fetchGigFunctions");

describe("fetch single gig", ()=>{
    it("returns a gig based on its id", async ()=>{
        const data = await fetchGigById(2);
        expect(data).toEqual({
        id: 2,
        name: "Jazz Night at Blue Note",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400",
        description: "An intimate evening of smooth jazz featuring local and international artists in the legendary Blue Note venue.",
        date: "2025-09-03",
        location: "Blue Note Jazz Club, Greenwich Village"
      });
    });
    
    it("returns an error message if supplied with an invalid id", async ()=>{
        await expect(fetchGigById(4)).rejects.toThrow();
    });

})