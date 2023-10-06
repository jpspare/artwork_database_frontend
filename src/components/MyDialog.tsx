import { useContext } from "react";
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Grid 
  } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useStore } from "react-redux";

import Input from "./Input";
import { server_calls } from "../api/server";
import { 
    chooseTitle, 
    chooseArtist, 
    chooseMedium, 
    chooseDate, 
    chooseOrigin 
  } from "../redux/slices/RootSlice";
import { UserContext } from "../App";

type MyDialogProps = {
    id?: string[];
    open: boolean;
    onClose: () => void;
}

const MyDialog = ( props: MyDialogProps ) => {
  const { register, handleSubmit } = useForm({});
  const dispatch = useDispatch();
  const store = useStore();
  const { userInfo } = useContext(UserContext);

  const onSubmit = (data: any) => {
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data, `${userInfo.userID}`)
      console.log(`Updated: ${data.title}`)
      setTimeout(() => {window.location.reload()}, 1000);
    } else {
      dispatch(chooseTitle(data.title));
      dispatch(chooseArtist(data.artist));
      dispatch(chooseMedium(data.medium));
      dispatch(chooseDate(data.date));
      dispatch(chooseOrigin(data.origin));

      server_calls.create(store.getState(), `${userInfo.userID}`);
      console.log(`Added: ${data.title}`)
      setTimeout(() => {window.location.reload()}, 500);

      props.onClose();
    }
  }

  if ( !props.open ) return (<></>)
  return (
    <>
      <Dialog open={ props.open } onClose={ ()=>(props.onClose()) }>
        {props.id && props.id.length > 0 ? 
          (<DialogTitle>Update Artwork</DialogTitle>) :
          (<DialogTitle>Add Artwork</DialogTitle>)
        }
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Input {...register('title')} name='title' placeholder="Title"/>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Input {...register('artist')} name='artist' placeholder="Artist"/>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Input {...register('medium')} name='medium' placeholder="Medium"/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Input {...register('date')} name='date' placeholder="Date"/>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Input {...register('origin')} name='origin' placeholder="Origin"/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose} color="error" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant="outlined">
              Submit
            </Button>
        </DialogActions>
      </Dialog>      
    </>
  )
}

export default MyDialog
