import { Divider, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { routerUri } from '../../config';
import { TopBar } from './TopBar';

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
      <TopBar onMenuClick={() => setDrawerOpen(true)} />
      <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerList style={{ width: 300 }}>
          <ListItem button onClick={() => setDrawerOpen(false)}>
            <ListItemIcon>
              <Icon>arrow_left</Icon>
            </ListItemIcon>
            <ListItemText primary='Back' />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              history.push(routerUri.notes);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <Icon>notes</Icon>
            </ListItemIcon>
            <ListItemText primary='Notes' />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push(routerUri.tags);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <Icon>label</Icon>
            </ListItemIcon>
            <ListItemText primary='Tags' />
          </ListItem>
          <Divider />
          <div style={{ flexGrow: 1 }} />
          <ListItem
            button
            onClick={() => {
              history.push(routerUri.settings);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary='Settings' />
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
