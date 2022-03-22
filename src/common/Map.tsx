/* global kakao */
import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Map = () => {
  const latitude = 37.45706565;
  const longitude = 126.8960369;
  useEffect(() => {
    let container = document.getElementById("map");

    let options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);

    console.log("loading kakao map");
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{
          width: "500px",
          height: "400px",
        }}
      ></div>
    </div>
  );
};

export default Map;
