import Grid from '@mui/material/Grid';
import { styled } from 'styled-components';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import { GotDataObject } from '../components/GotCharacters';
import { useEffect, useState } from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { getAllGotCharacterNamesAPI, getAllHouseNamesAPI, getCharacterBykeywordSearch,getAllGotCharacterByHouseAndCharacterNamesAPI, removeBackslashes } from '../global/GlobalAPI';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ImageMasonry from '../components/ImageMasonry';
import Paper from '@mui/material/Paper';
import FamilyTree from '../components/FamilyTree';



interface CustomItemProps {
  nobg: boolean;
}


const CustomItem = styled.div<CustomItemProps>`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: ${(props) => (props.nobg ? 'none' : 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px')};
  background-color: ${(props) => (props.nobg ? 'transparent' : 'rgb(255, 255, 255)')};
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  padding: 8px;
  text-align: center;
  width: -webkit-fill-available;
  margin-top: 2vh;
  margin-bottom: 2vh;
  color: rgba(0, 0, 0, 0.6);
`

interface Props {
  window?: () => Window;
}

const Home = (props: Props) => {


    const [gotData, setGotData] = useState<GotDataObject[]>([]);
    const [houseNames, setHouseNames] = useState<string[]>([]);

    const matches768 = useMediaQuery('(min-width:768px)');


    const [selectedHouseName, setSelectedHouseName] = useState<string[]>([]);

    const handleHouseNameSelection = (event: React.ChangeEvent<{}>, value: string[]) => {

      setSelectedHouseName(value);
      const target = event.target as Element;

      if(target.nodeName !== 'LI'){
        if(value.length === 0 && searchTerm === ""){
          getGOTCharacters();
        }
        else if(value.length === 0 && searchTerm !== ""){
          charKeyWordSearch();
        }
        else{
          filterCharactersByHouseNamesAndCharacter(value, searchTerm);
        }
      }
      
      
    };


    const [searchTerm, setSearchTerm] = useState('');
    const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    getGOTCharacters();
    getHouseNames();
  }, [])


  const getGOTCharacters = async () => {
    try {
      const characterNames = await getAllGotCharacterNamesAPI();
      const modifiedData = removeBackslashes(characterNames);
    setGotData(modifiedData);
    } catch (error) {
      console.error("Failed to fetch character names:", error);
      // Handle the error (e.g., display an error message)
    }
  };

  const getHouseNames = async()=> {
    try {
      const gotHouseNames = await getAllHouseNamesAPI();
      setHouseNames(gotHouseNames);
    } catch (error) {
      console.error("Failed to fetch HouseNames:", error);
      // Handle the error (e.g., display an error message)
    }

   
  }


  const closeSearchTerm = ()=> {
    setSearchTerm("");
    if(selectedHouseName.length === 0){
        getGOTCharacters();
    }
    else if(selectedHouseName.length !== 0){
      filterCharactersByHouseNamesAndCharacter(selectedHouseName,"");
    }
  }
  const characterSearch = async()=> {

    if(searchTerm === "" && selectedHouseName.length === 0){
      const variant: VariantType = 'error';
      enqueueSnackbar('Empty String Search Not Allowed', { variant });
    }
    else if(searchTerm !== "" && selectedHouseName.length === 0){
      charKeyWordSearch();
    }
    else{
      filterCharactersByHouseNamesAndCharacter(selectedHouseName,searchTerm);
    }
  }

  const charKeyWordSearch =async()=> {
    try {
      const keyWordSearchResponse = await getCharacterBykeywordSearch(searchTerm);
      const modifiedData = removeBackslashes(keyWordSearchResponse);
      setGotData(modifiedData);
    } catch (error) {
      console.error("Failed to fetch CharacterBykeywordSearch:", error);
      // Handle the error (e.g., display an error message)
    }
  }


  const filterCharactersByHouseNamesAndCharacter = async (chosenHouseName: string[], searchTermData: string) => {
    try {
      const gotresponseData = await getAllGotCharacterByHouseAndCharacterNamesAPI(chosenHouseName.join(","), searchTermData === "" ? "empty" : searchTermData);
        const modifiedData = removeBackslashes(gotresponseData);
        setGotData(modifiedData);
    } catch (error) {
      console.error("Failed to fetch AllGotCharacterByHouseAndCharacterNames:", error);
      // Handle the error (e.g., display an error message)
    }

   
  };

  return (
    <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={3}>
              {
                matches768 && 
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ display: 'flex',justifyContent: 'center',flexDirection:'column', position:'sticky', top:'10%', height: '100%'}}>
                <FormControl fullWidth sx={{ marginTop:'1vh', marginBottom:'1vh' }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Search By Character</InputLabel>
                         <OutlinedInput
                          id="outlined-adornment-amount"
                          onChange={(e)=> setSearchTerm(e.target.value)}
                          value={searchTerm}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={closeSearchTerm}
                              >
                                <HighlightOffIcon/>
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Amount"
                        />
                      </FormControl>
                      <Autocomplete
                        sx={{marginBottom:'2vh'}}
                        fullWidth
                        multiple
                        value={selectedHouseName}
                        onChange={handleHouseNameSelection}
                        id="controllable-states-demo"
                        options={houseNames}
                        renderInput={(params) => <TextField {...params} label="Filter by HouseName" sx={{background:'white'}}/>}
                        />
                          <Button variant="outlined"fullWidth onClick={characterSearch}>Search</Button>
  
                          <CustomItem nobg={false}>
                              <FamilyTree/>
                          </CustomItem>
                          
                </Grid>
              }
             

              <Grid item xs={12} sm={8} md={8} lg={8} xl={8} sx={{ display: 'flex', alignItems:'center', flexDirection:'column',justifyContent: 'center', marginTop:'2vh',marginBottom: '3vh' }}>
                {
                  !matches768 && 
                  <>
                    <FormControl fullWidth sx={{ marginTop:'1vh', marginBottom:'1vh' }}>
                      <InputLabel htmlFor="outlined-adornment-amount">Search By Character</InputLabel>
                       <OutlinedInput
                        id="outlined-adornment-amount"
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        value={searchTerm}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                              onClick={closeSearchTerm}
                            >
                              <HighlightOffIcon/>
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl>
                    <Autocomplete
                      sx={{marginBottom:'2vh'}}
                      fullWidth
                      multiple
                      value={selectedHouseName}
                      onChange={handleHouseNameSelection}
                      id="controllable-states-demo"
                      options={houseNames}
                      renderInput={(params) => <TextField {...params} label="Filter by HouseName" sx={{background:'white'}}/>}
                      />
                        <Button variant="outlined"fullWidth onClick={characterSearch}>Search</Button>

                        <CustomItem nobg={false}>
                            <FamilyTree/>
                        </CustomItem>
                        
                  
                  </>
                }
                    <CustomItem nobg={true}>
                      <ImageMasonry gotData={gotData}/>
                    </CustomItem>
              </Grid>
            </Grid>
  </Box>


  )
}

const WrappedHome = () => {
    return (
      <SnackbarProvider maxSnack={3}>
        <Home/>
      </SnackbarProvider>
    );
  };
  
  export default WrappedHome;
