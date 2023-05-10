import {CircularProgress} from "@mui/material";

export default  function Loading( ){
    return (
        <div style={{background:'#cbd5e1',height:'100%',padding:'2em',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <CircularProgress color="inherit" />
        </div>
    )
}