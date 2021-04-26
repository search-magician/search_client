import './App.css';
import { Grid, TextField, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Axios from 'axios';

async function fetch(url) {
  const config = {
    url: "http://localhost:5000" + url,
  };
  return (await Axios(config)).data;
}

function App() {
  const [Er, setEr] = useState([]);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(0);
  const [trans, setTrans] = useState("");
  const [classes, setClasses] = useState([]);


  const idChangeHandle = (e) => {
    setId(e.target.value);
  }
  const search = () => {
    console.log("lo");
    const erUrl = '/vidoes/youtube/' + id + '/er';
    const getEr = async () => {
      setLoading((last) => last + 1);
      const data = await fetch(erUrl);
      setEr(data);
      setLoading((last) => last - 1);
    };

    const transUrl = '/vidoes/youtube/' + id + '/raw';
    const getTrans = async () => {
      setLoading((last) => last + 1);
      const data = await fetch(transUrl);
      setTrans(data);
      setLoading((last) => last - 1);
    }

    const classUrl = '/vidoes/youtube/' + id + '/classification';
    const getClasses = async () =>{
      const data = await fetch(classUrl);
      setClasses(data.topics);
      console.log(data);
    }
    getEr();
    getTrans();
    getClasses();

  }

  return (
    <div className="root">
      <Grid container
        justify="center"
        spacing={4}
        direction="column"
        alignItems="center">
        <TextField type="text" onChange={idChangeHandle} />
        <Button onClick={search} >search</Button>
        {loading > 0 ? <span>loading</span> : ""}

        <Grid container
          justify="center"
          spacing={4}
          direction="row"
          alignItems="flex-start"
          >
          <Grid item container
            justify="center"
            spacing={4}
            direction="column"
            alignItems="center"
            xs={4}>
            {Er.map((item) => <spar>{item.text} ---> {item.label}</spar>)}
          </Grid>

          <Grid item xs={4}>
            {trans}
          </Grid>

          <Grid item xs={4}>
            {classes.map((item) => <spar>{item}</spar>)}
          </Grid>

        </Grid>

      </Grid>
    </div>
  );
}

export default App;
