import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { QueryResult } from "@apollo/react-common";

interface LoadingOrErrorProps {
  query: QueryResult;
}

export const LoadingOrError: React.SFC<LoadingOrErrorProps> = props => {
  if (props.query.loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (props.query.error) {
    return (
      <div>
        {props.query.error?.graphQLErrors.map(({ message }) => (
          <Typography color="error">{message}</Typography>
        ))}
      </div>
    );
  }
  return <div>{props.children}</div>;
};
