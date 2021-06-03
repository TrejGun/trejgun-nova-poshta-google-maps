import React, {memo} from "react";
import {Marker, MarkerProps} from "@react-google-maps/api";

export const MemoMarker = memo<MarkerProps>(props => {
  return <Marker {...props} />;
});
