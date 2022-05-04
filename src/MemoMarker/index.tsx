import { memo } from "react";
import { Marker, MarkerProps } from "@react-google-maps/api";

// export const x = memo(fn)
// just does not work with webpack

const TmpMarker = memo((props: MarkerProps) => {
  return <Marker {...props} />;
});

export const MemoMarker = TmpMarker;
