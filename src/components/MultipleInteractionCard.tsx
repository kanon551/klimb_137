import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { GotDataObject } from './GotCharacters';
import { assignCharacterObjectASTrue } from '../global/GlobalAPI';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { addTree } from '../global/TreeReducer';


interface RowCardProps {
    obj:  GotDataObject
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const MultipleInteractionCard = ({obj}: RowCardProps)=> {

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(obj.favorite);
  }, [obj.favorite]);

  const favoriteClicked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    
    
    try {
      await assignCharacterObjectASTrue(obj.id, event.target.checked);
      const variant: VariantType = event.target.checked === true ? 'success' : "info";
      enqueueSnackbar(`${obj.charactername} is marked as ${event.target.checked === true ? "😍 Favorite" : "😡Un-Favorite"}`, { variant });
    } catch (error) {
      console.log("Not ok", error);
    }
  };

  const sendTreeObj = () => {
    dispatch(addTree({ id: 0, characters: obj.characters, favorite:obj.favorite, charactername:obj.charactername }))
  }

  return (
    <Card variant="outlined" onClick={sendTreeObj}>
      <CardOverflow sx={{padding:'0px !important'}}>
          <img
          src={`${obj.characters.characterImageFull ?    obj.characters.characterImageFull : "https://yt3.googleusercontent.com/ytc/AGIKgqOtZ8jskN6tWpqpUaItLrahAJu7zMFqhz4D_VC_SQ=s900-c-k-c0x00ffffff-no-rj"}`}
          srcSet={`${obj.characters.characterImageFull ?    obj.characters.characterImageFull : "https://yt3.googleusercontent.com/ytc/AGIKgqOtZ8jskN6tWpqpUaItLrahAJu7zMFqhz4D_VC_SQ=s900-c-k-c0x00ffffff-no-rj"}`}
          loading="lazy"
          alt={obj.charactername}
          style={{
            borderRadius: 10,
            display: 'block',
            width: '100%',
            padding: '2px 4px',
            background:'azure',
            boxShadow: 'rgba(0, 0, 0, 0.5) -10px 10px 5px -3px'
          }}
        />
        <Checkbox {...label} sx={{
            position: 'absolute',
            zIndex: 2,
            background:'palegreen',
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
            "&:hover": {
                background:'palegreen !important',
              },
          }} 
          color="error"
          checked={checked}
          icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>favoriteClicked(event)}/>
      </CardOverflow>
      <CardContent>
        <Typography level="h2" fontSize="md">
          <Link href="#multiple-actions" overlay underline="none">
          {obj.charactername}
          </Link>
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          <Link href="#multiple-actions" overlay underline="none">
            {
                obj.characters.actorName ? obj.characters.actorName : ""
            }
          </Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography
            level="body3"
            sx={{ fontWeight: 'md', color: 'text.secondary' }}
          >
           House name
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body3"
            sx={{ fontWeight: 'md', color: 'text.secondary' }}
          >
           {
            obj.characters && obj.characters.houseName
                ? typeof obj.characters.houseName === 'string'
                ? obj.characters.houseName
                : Array.isArray(obj.characters.houseName)
                    ? obj.characters.houseName.join(', ')
                    : ''
                : ''
            }
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}

const WrappedMultipleInteractionCard = ({obj}: RowCardProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <MultipleInteractionCard obj={obj}/>
    </SnackbarProvider>
  );
};

export default WrappedMultipleInteractionCard;