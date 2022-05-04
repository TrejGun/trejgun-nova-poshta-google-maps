import { useState } from "react";

import { MapLoader } from "../../src/Loader";
import { IWarehouse, Languages } from "../../src/nova-poshta";

export function App() {
  const [warehouse, setWarehouse] = useState<IWarehouse>();

  // google is not defined yet, so it can't be use for typings
  const getCoordinates = (onSuccess: (coordinate: any) => void, onError: (error: Error) => void): void => {
    onSuccess({
      lat: 50.45466,
      lng: 30.5238,
    }); // Kyiv
    window.navigator.geolocation.getCurrentPosition(
      position => {
        onSuccess({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      geolocationPositionError => onError(new Error(geolocationPositionError.message)),
    );
  };

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .nova-poshta-map {
              width: 600px;
              height: 400px;
              background-color: #c0c0c0;
            }
          `,
        }}
      />
      <MapLoader
        language={Languages.ua}
        zoom={14}
        onError={console.error}
        googleMapsApiKey={process.env.GOOGLE_API_KEY}
        novaPoshtaApiKey={process.env.NOVA_POSHTA_API_KEY}
        className={"nova-poshta-map"}
        onSelect={setWarehouse}
        getCoordinates={getCoordinates}
        options={{
          zoomControlOptions: {
            // @ts-ignore
            position: "RIGHT_CENTER",
          },
        }}
      >
        <span>Loading...</span>
      </MapLoader>

      <div>Selected: {warehouse ? warehouse.Number : "N/A"}</div>
    </div>
  );
}
