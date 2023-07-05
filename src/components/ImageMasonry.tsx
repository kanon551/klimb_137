import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { useEffect, useState } from 'react';
import WrappedMultipleInteractionCard from './MultipleInteractionCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';


export interface GotDataObject {
    characters: any;
    favorite: boolean;
    charactername: string;
    id: number;
  }

  interface GotDataProps {
    gotData: GotDataObject[]
  }


export default function ImageMasonry({gotData}: GotDataProps) {

    const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 15;
  const productsVisited = pageNumber * productsPerPage;
 
  const matches = useMediaQuery('(min-width:1024px)');


  useEffect(()=> {
    setPageNumber((prev)=> prev - prev)
  },[gotData])

  const pageCount = gotData.length !== 0 ? Math.ceil(gotData.length / productsPerPage) : 0;
  const changePage = (event: any, value: number) => {
    setPageNumber(value - 1);
  };


  return (
    <Box sx={{ width: '100%', minHeight: 829}}>
        {
             gotData.length === 0 && <h3> No Data Found</h3>
        }
      <Masonry columns={{ xs: 1, sm: 2, md:2, lg:3, xl:4}} spacing={2}>
            {
              gotData.length !== 0 && gotData.slice(productsVisited, productsVisited + productsPerPage).map((obj: GotDataObject, index: number) => (
                <div key={index}>
                      <WrappedMultipleInteractionCard obj={obj}/>
                    </div>
                ))
            }
      </Masonry>
      <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3vh', marginBottom:'5vh' }}>
            <Pagination
              count={pageCount}
              onChange={changePage}
              size={matches ?"large" : "small"}
              variant="outlined" color="secondary"
            />
          </Stack>
    </Box>
  );
}