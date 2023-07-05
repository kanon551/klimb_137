import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import WrappedMultipleInteractionCard from './MultipleInteractionCard';


  export interface GotDataObject {
    characters: any;
    favorite: boolean;
    charactername: string;
    id: number;
  }

  interface GotDataProps {
    gotData: GotDataObject[]
  }

const GotCharacters = ({gotData}: GotDataProps) => {

    const matches = useMediaQuery('(min-width:1024px)');

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 15;
  const productsVisited = pageNumber * productsPerPage;
 
  useEffect(()=> {
    setPageNumber((prev)=> prev - prev)
  },[gotData])
 
  const pageCount = gotData.length !== 0 ? Math.ceil(gotData.length / productsPerPage) : 0;
  const changePage = (event: any, value: number) => {
    setPageNumber(value - 1);
  };


  
    return (
        <div>
          <Grid container spacing={3}>
          {
              gotData.length === 0 &&
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    No Data Found
                </Grid>
            }
            {
              gotData.length !== 0 && gotData.slice(productsVisited, productsVisited + productsPerPage).map((obj: GotDataObject, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index} >
                    <WrappedMultipleInteractionCard obj={obj}/>
                </Grid>
                ))
            }
             </Grid>
            <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3vh', marginBottom:'5vh' }}>
            <Pagination
              count={pageCount}
              onChange={changePage}
              size={matches ?"large" : "small"}
              variant="outlined" color="secondary"
            />
          </Stack>
        </div>
    )
}

export default GotCharacters
