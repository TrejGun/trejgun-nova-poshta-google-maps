# Nova Poshta Google Map

### About

This is pretty simple widget which shows warehouses of Nova Poshta on Google Map
It loads all warehouses which is about 13.5 Mb of data and renders about 5900 markers
Which is quite a lot and can cause significant performance degradation of you site

### Installation

```sh
npm install @trejgun/nova-poshta-google-map --save
```

### Usage

Here is an basic example of usage

The `children` of `NovaPoshtaMap` component are wrapped in a div with size of the map and used to render loading state.

```js
import React, { useState } from 'react'
import { NovaPoshtaMap } from '@trejgun/nova-poshta-google-maps'

function MyComponent() {
  const [warehouse, setWarehouse] = useState(null);

  const getCoordinates = setCoordinates => {
    setCoordinates({
      lat: 50.45466,
      lng: 30.5238,
    }); // Kyiv
  }

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
      <NovaPoshtaMap
        language="ru"
        zoom={14}
        onError={console.error}
        googleMapsApiKey="GOOGLE_API_KEY"
        novaPoshtaApiKey="NOVA_POSHTA_API_KEY"
        className={'nova-poshta-map'}
        onSelect={setWarehouse}
        getCoordinates={getCoordinates}
        options={{
          zoomControlOptions: {
            position: "RIGHT_CENTER"
          }
        }}
      >
        <span>Loading...</span>
      </NovaPoshtaMap>

      <div>Selected: {warehouse ? warehouse.Number : 'N/A'}</div>
    </div>
  )
}
```

you can also get coordinates from browser

```js
  const getCoordinates = (setCoordinates, onError) => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      onError,
    )
  }
```

from geocoder

```js
  const getCoordinates = (setCoordinates, onError) => {
    new google.maps.Geocoder().geocode(
      {
        address: "Kyiv",
      },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          setCoordinates(results[0].geometry.location)
        } else {
          onError(new Error(status))
        }
      },
    )
  }
```

or from any other source. And its better to combine any async approach with sync one to
avoid map blinking


## API

You also have to pass map size to google map, however how to do this is your choice.
In this example I use style element but you most likely would use styled components.


`googleMapsApiKey` - [required] this is what it is - Google maps API key

`novaPoshtaApiKey` - [required] same-same - Nova Poshta API key

`className` - [required] this class is used both for map and loader

`onSelect` - [required] call back which will be firen when user clicks marker, full object of warehouse data is passed as only param

`onError` - [required] error callback, would be fires in case of ajax errors, has only one parameter - error

`getCoordinates` - [required] user defined function to get initial params, can be called more then once

`language` - [optional|ua] language of the widget, although Google map supports a lot of languages,
Nova Poshta supports only two - russian (ru) and ukrainian (ua). Ukrainian language is default

`zoom` - [optional|14] Google maps zoom parameter, defaults to 14

`options` - [optional] Google map options parameter
