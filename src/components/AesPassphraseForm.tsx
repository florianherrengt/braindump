import {
  Button,
  TextField,
  CardContent,
  Card,
  useMediaQuery,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { SelectTag, Tag } from "./SelectTag";
import { Tooltip } from "@material-ui/core";
import CryptoJS from "crypto-js";

interface AesPassphraseFormProps {
  onSubmit(input: { passphrase: string }): any;
}

const Container = styled.div`
  width: 100%;
`;

const AesPassphraseForm = (props: AesPassphraseFormProps) => {
  const isMobile = useMediaQuery("(max-width:450px)");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>();

  const submit = () => {
    // const aesTestString = localStorage.getItem("aesTestString");
    // if (!aesTestString) {
    //   localStorage.setItem("aesTestString", text);
    // } else {
    //   if (!CryptoJS.AES.decrypt(aesTestString, text).toString()) {
    //     setError("Invalid passphrase");
    //     return;
    //   }
    // }
    props.onSubmit({ passphrase: text });
    setText("");
  };
  return (
    <Container>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (!text) {
            return;
          }
          submit();
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <div
              style={{ display: isMobile ? "block" : "flex", marginTop: 20 }}
            >
              <div style={{ flex: 1 }}>
                <TextField
                  autoFocus
                  onChange={({ target: { value } }) => setText(value)}
                  value={text}
                  style={{ width: "100%" }}
                  variant="outlined"
                  placeholder="Enter you AES secret passphrase"
                  onKeyDown={event => {
                    setError("");
                    if (event.key === "Enter") {
                      if (event.ctrlKey || event.altKey || event.metaKey) {
                        event.preventDefault();
                        submit();
                      }
                    }
                  }}
                />
              </div>
              <Tooltip
                disableTouchListener
                enterDelay={0}
                title={`${
                  navigator.platform.toLocaleLowerCase().includes("mac")
                    ? "Cmd"
                    : "Ctrl"
                } + Enter`}
                aria-label="save with Ctrl + Enter"
              >
                <Button
                  variant={isMobile ? "outlined" : "text"}
                  style={isMobile ? { width: "100%", marginTop: 20 } : {}}
                  type="submit"
                >
                  Save
                </Button>
              </Tooltip>
            </div>
            {error && <Typography color="error">{error}</Typography>}
          </CardContent>
        </Card>
      </form>
    </Container>
  );
};

export { AesPassphraseForm };
