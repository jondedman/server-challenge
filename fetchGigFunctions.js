
const TEST_PORT = process.env.NODE_ENV === 'test' ? 3001 : 3000;
const BASE_URL = `http://localhost:${TEST_PORT}`;

const fetchGigsData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/gigs`);
        // console.log("resposne", response);
        
        if(!response.ok) {
            throw new Error("There was a problem");
        }
        const data = await response.json();
        // console.log(data);
        

        
        return data
    } catch (error) {
        throw error;
    }
}

const fetchGigById = async (id) =>{
    try {
        // console.log("fetch gig", id);
        
        const response = await fetch(`${BASE_URL}/gigs/${id}`);
        // console.log("fetch gig", response.status);
        
        if(!response.ok) {
            if(response.status == 404) {
                throw new Error("Gig not found")
            }
        }
        const data = await response.json();
        // console.log("function", data);
        
        return data
    } catch (error) {
        throw error
    }
}

const deleteGigRequest = async(id) => {
try {
    const response = await fetch(`${BASE_URL}/gigs/${id}`, {
        method: 'DELETE'
    })
    return response
} catch (error) {
    
}
}


module.exports = { fetchGigsData, fetchGigById, deleteGigRequest }