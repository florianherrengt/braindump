import {
  AppBar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { routerUri } from "../../config";

const Container = styled.div``;

const CenterContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0px 10px;
`;

interface MainLayoutProps {}

const DrawerList = styled(List)`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainLayout: React.SFC<MainLayoutProps> = props => {
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <div>
      <AppBar
        style={{ color: grey[500] }}
        color="transparent"
        variant="outlined"
        position="static"
      >
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Icon>menu</Icon>
          </IconButton>
          <div style={{ flexGrow: 1 }} />

          {/* <IconButton edge="end" color="inherit" aria-label="menu"> */}

          {/* </IconButton> */}
          <IconButton edge="end" color="inherit" aria-label="menu">
            <Icon>account_circle</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerList style={{ width: 300 }}>
          <ListItem button onClick={() => setDrawerOpen(false)}>
            <ListItemIcon>
              <Icon>arrow_left</Icon>
            </ListItemIcon>
            <ListItemText primary="Back" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => history.push(routerUri.notes)}>
            <ListItemIcon>
              <Icon>notes</Icon>
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button onClick={() => history.push(routerUri.tags)}>
            <ListItemIcon>
              <Icon>label</Icon>
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItem>
          <Divider />
          <div style={{ flexGrow: 1 }} />
          <ListItem button>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </DrawerList>
      </Drawer>
      <Container>
        <CenterContainer>{props.children}</CenterContainer>
      </Container>
    </div>
  );
};

export { MainLayout };
