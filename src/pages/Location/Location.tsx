/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styles from "./Location.module.css";
import { useNavigate } from "react-router-dom";
import Flower from "../../components/Flower/Flower";
import Footer from "../../components/Footer/Footer";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export default function Location() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [keywordLocation, setKeywordLocation] = useState(" ");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keywordLocation, placesSearchCB);

    function placesSearchCB(data: string | any[], status: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: { y: any; x: any; place_name: string }) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
        infowindow.open(map, marker);
      });
    }
  }, [keywordLocation]);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onClickSearch = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setKeywordLocation(keyword);
    setKeyword("");
  };

  const moveToHome = () => {
    navigate("/main");
  };

  return (
    <>
      <Flower />
      <article className={styles.article}>
        <h1 className={styles.main} onClick={moveToHome}>
          홈으로 가기
        </h1>
        <p className={styles.findGym}>
          주변 헬스장을 검색해 보세요! 🐱‍🏍 <br />
          <span className={styles.locationExample}>(예시 : 북가좌동 헬스장)</span>
        </p>
        <section>
          <form className={styles.section}>
            <input className={styles.input} placeholder="위치 :" value={keyword} onChange={onChangeKeyword} />
            <button className={styles.checkButton} onClick={onClickSearch}>
              검색
            </button>
          </form>
        </section>
        <div id="map" className={styles.kakaoMap}></div>
        <Footer />
      </article>
    </>
  );
}
