/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect } from "react";
import "./Map.css";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

const { kakao }: Window = window;

const Map = ({ latitude, longitude }: any) => {
  useEffect(() => {
    // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
    const placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
    const contentNode = document.createElement("div"); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
    let markers: any = []; // 마커를 담을 배열입니다
    const currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOptions);
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(map);
    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", searchPlaces);
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
    contentNode.className = "placeinfo_wrap";
    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
    addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
    addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);
    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target: any, type: any, callback: any) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent(`on${type}`, callback);
      }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
      if (!currCategory) {
        return;
      }
      // 커스텀 오버레이를 숨깁니다
      placeOverlay.setMap(null);
      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();
      ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places: any) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      const order = document
        .getElementById(currCategory)
        ?.getAttribute("data-order");
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        const marker = addMarker(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          order
        );
        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (marker, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position: any, order: any) {
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
      const imageSize = new kakao.maps.Size(27, 28); // 마커 이미지의 크기
      const imgOptions = {
        spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      };
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      );
      const marker = new kakao.maps.Marker({
        position, // 마커의 위치
        image: markerImage,
      });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo(place: any) {
      let content =
        `<div class="placeinfo">` +
        `   <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>`;

      if (place.road_address_name) {
        content +=
          `    <span title="${place.road_address_name}">${place.road_address_name}</span>` +
          `  <span class="jibun" title="${place.address_name}">(지번 : ${place.address_name})</span>`;
      } else {
        content += `    <span title="${place.address_name}">${place.address_name}</span>`;
      }

      content +=
        `    <span class="tel">${place.phone}</span>` +
        `</div>` +
        `<div class="after"></div>`;

      contentNode.innerHTML = content;
      placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      placeOverlay.setMap(map);
    }
  }, [latitude]);

  return (
    <div className="map_wrap">
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default Map;
