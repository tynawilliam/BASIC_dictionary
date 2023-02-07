import React, { useEffect, useState } from "react";
import { getWords, isAnagram } from "./words";
import calcDistance from "./levenshteinDistance";
import {
  Box,
  Button,
  FormGroup,
  List,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [closeWord, setCloseWord] = useState([]);
  const [words, setWords] = useState([]);
  const [mainWord, setMainWord] = useState("");
  const [clicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getWordsArr = async () => {
      const data = await getWords();
      setWords(data);
    };
    getWordsArr();
  });

  const checkSpelling = (e) => {
    e.preventDefault();
    setClicked(true);
    setCloseWord([]);
    const str = document.getElementById("string").value.toLowerCase();
    setMainWord(str);

    //check if string is pure string ^[a-zA-Z]+$
    const reg = /^[a-zA-Z]+$/;
    if (!str.match(reg)) {
      setErrorMessage("Only Letters Allowed");
      return;
    }

    const closestWordArr = [];
    for (let word of words) {
      const getDist = calcDistance(str, word);
      if (getDist === 0) {
        setCloseWord([word]);
        return;
      }

      if (getDist === 1) {
        if (!closestWordArr.includes(word)) {
          closestWordArr.push(word);
        }
      }
      const getAnagram = isAnagram(str, word);
      if (getAnagram) {
        closestWordArr.push(word);
      }
    }
    // const closestWordArr = new Array(closestWordSet);
    setCloseWord(closestWordArr);
    document.getElementById("string").value = "";
    return;
  };

  return (
    <Box
      sx={{
        width: "100vw",
        maxWidth: 500,
        border: "2px solid grey",
        margin: "0 auto",
        marginTop: "10rem",
        padding: "2rem",
        borderRadius: "30px",
        textAlign: "center",
      }}
    >
      <Typography color="secondary" variant="h2" gutterBottom>
        BASIC
      </Typography>
      <Typography sx={{ color: "grey" }} variant="h3">
        {" "}
        Spell Checker
      </Typography>
      <form onSubmit={checkSpelling}>
        <FormGroup>
          <TextField id="string" label="Word" variant="outlined" />
          <Button
            sx={{
              width: "10rem",
              margin: "0 auto",
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Check Word
          </Button>
        </FormGroup>
      </form>
      {clicked ? (
        closeWord[0] === mainWord ? (
          <Typography color="secondary" variant="h4" gutterBottom>
            This is a BASIC word!
          </Typography>
        ) : closeWord.length ? (
          <>
            <Typography color="secondary" variant="h4" gutterBottom>
              Did you mean one of these words?
            </Typography>
            <Box>
              <List
                sx={{
                  width: "30rem",
                  height: "10rem",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                {closeWord.map((word, idx) => (
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "20px" }}
                    key={idx}
                  >
                    {word}
                  </ListItemText>
                ))}
              </List>{" "}
            </Box>
          </>
        ) : errorMessage ? (
          <h1>{errorMessage}</h1>
        ) : (
          <h1>No Words Found</h1>
        )
      ) : (
        ""
      )}
    </Box>
  );
}

export default App;
