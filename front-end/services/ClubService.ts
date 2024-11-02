import { fetchExternalImage } from "next/dist/server/image-optimizer";
import Clubs from "pages/clubs";

const getAllClubs = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/clubs");
};
  
  
const ClubService = {
    getAllClubs,
};
  
export default ClubService;