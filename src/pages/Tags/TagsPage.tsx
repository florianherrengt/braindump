import React from "react";
import { MainLayout } from "../Layout";
import { TagsListContainer } from "./TagsListContainer";
import { CreateTagContainer } from "./CreateTagContainer";
import { LineSpacer } from "../../components";

interface TagsPageProps {}

export const TagsPage: React.SFC<TagsPageProps> = props => {
  return (
    <MainLayout>
      <LineSpacer />
      <CreateTagContainer />
      <LineSpacer />
      <TagsListContainer />
    </MainLayout>
  );
};
