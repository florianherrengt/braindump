import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";

interface LoadingOrErrorProps {
  loading: boolean;
  errors?: string[];
}

export const LoadingOrError: React.SFC<LoadingOrErrorProps> = props => {
  if (props.loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (props.errors) {
    return (
      <div>
        {props.errors.map(error => (
          <Typography>{error}</Typography>
        ))}
      </div>
    );
  }
  return <div>{props.children}</div>;
};
