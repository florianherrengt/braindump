import {
  AppBar,
  createStyles,
  Icon,
  IconButton,
  InputBase,
  List,
  makeStyles,
  Theme,
  Toolbar,
  useTheme
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React from "react";
import styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router";

const SearchContainer = styled.div`
  position: relative;
  margin-left: 24px;
  width: 100%;
`;

const SearchIconContainer = styled.div`
  height: 100%;
  width: 56px;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled(InputBase)`
  & {
    input {
      padding: 8px 8px 8px 56px;
    }
  }
`;

interface TopBarProps {
  onMenuClick(): void;
}

export const TopBar: React.SFC<TopBarProps> = props => {
  const location = useLocation();
  const history = useHistory();

  return (
    <AppBar
      style={{ color: grey[500] }}
      color="transparent"
      variant="outlined"
      position="static"
    >
      <Toolbar>
        <IconButton
          onClick={() => props.onMenuClick()}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Icon>menu</Icon>
        </IconButton>

        <SearchContainer>
          <SearchIconContainer>
            <Icon>search</Icon>
          </SearchIconContainer>
          <SearchInput
            onChange={event => {
              history.replace(
                `${location.pathname}?seach=${event.target.value}`
              );
            }}
            defaultValue={new URLSearchParams(location.search).get("search")}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchContainer>

        <div style={{ flexGrow: 1 }} />

        <IconButton
          onClick={() => (location.search = "?search=hadasde")}
          edge="end"
          color="inherit"
          aria-label="menu"
        >
          <Icon>account_circle</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
