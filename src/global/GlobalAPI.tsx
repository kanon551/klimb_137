import axios from "axios";
import { GotDataObject } from "../components/GotCharacters";


export const generalURL = "localhost:8080/characters";


export const authAxios = axios.create({
  baseURL: `http://${generalURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const treeURL = "localhost:8080/api/v1";
export const treeAxios = axios.create({
  baseURL: `http://${treeURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});


export const removeBackslashes = (arr: GotDataObject[]) => {
  return arr.map((obj:GotDataObject) => {
    obj.characters = JSON.parse(obj.characters.replace(/\\/g, ""));
    return obj;
  });
};



export const getAllGotCharacterNamesAPI = async () => {
  try {
    const res = await authAxios.get(`/fullObject`);
    return res.data;
  } catch (error) {
    console.error("Error fetching character names:", error);
    // Handle the error (e.g., display an error message)
    throw new Error("Failed to fetch character names");
  }
};


export const getCharacterBykeywordSearch = async (characterName: any) => {
  try {
    const response = await authAxios.get(`/fetchCharactersByCharacterName/${characterName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters by keyword search:", error);
    // Handle the error (e.g., display an error message)
    throw new Error("Failed to fetch characters by keyword search");
  }
};


export const getAllHouseNamesAPI = async()=> {
  try{
    const res = await authAxios.get('/housenames');
    return res.data;
  } catch(error){
    console.log("Error fatching houseNames:", error);
    throw new Error("Failed to fetch all house names");
  }
}

export const getAllGotCharacterByHouseAndCharacterNamesAPI =async (houseNames:any, characterName: any) => {
  try{
    const res = await authAxios.get(`/fetchByHouseNamesAndCharacterNames/${houseNames}/${characterName}`);
    return res.data;
  } catch(error){
    console.log("Error fetching with housenames and charactername:", error);
    throw new Error("Failed fetching with housenames and charactername");
  }
}

export const assignCharacterObjectASTrue = async(id: number, favoriteStatus:boolean) => {
  try{
      await authAxios.put(`/setFavorite/${id}/${favoriteStatus}`);
  }
  catch(error){
    console.log("Error updating CharacterName:", error);
    throw new Error("Failed updating CharacterName");
  }
}

export const getCharacterNameByIDAPI = async(id:number)=> {
  try{
    const res = await authAxios.get(`/getCharacterById/${id}`);
    return res.data;
  } catch(error){
    console.log("Error fetching with characterNameBYID:", error);
    throw new Error("Failed fetching Character name by iD");
  }
}

export const getTree = async(houseName:string)=> {
  try{
    const res = await treeAxios.get(`/characters/${houseName}`);
    return res.data;
  }catch(error){
    console.log("Error fetching with tree:", error);
    throw new Error("Failed fetching tree");
  }
}