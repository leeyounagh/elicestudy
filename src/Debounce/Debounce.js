import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useDebounce from "./customHook/useDebounce";

// git config 파일에 인증키 추가해야됨

function Debounce() {
  const mainUrl = `${process.env.React_App_MAINURL}&serviceKey=${process.env.React_App_ENCODEKEY}`;
  // 테스트 데이터 정의
  const [mainData, setMainData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const debounceValue = useDebounce(searchTerm);
  // 디바운스 표현을위한 커스텀훅 호출

  const getAxiosData = async () => {
    const response = await axios.get(mainUrl);
    const { item } = await response.data.response.body.items;
    setMainData((prev) => [...prev, ...item]);
  };

  useEffect(() => {
    getAxiosData();
  }, [debounceValue]);

  const SearchOnchange = (value) => {
    setSearchTerm(value);
  };

  return (
    <main>
      <MainContainer>
        <MainSearchDiv>
          <RadioDiv>
            <MainSearchInput
              type="text"
              placeholder="🍳 제목검색.."
              value={searchTerm}
              onChange={(e) => {
                e.preventDefault();
                SearchOnchange(e.target.value);
              }}
            ></MainSearchInput>
          </RadioDiv>
        </MainSearchDiv>

        <MainContentsContainer>
          <Row xs={1} md={4} className="g-4">
            {mainData.length > 0 &&
              mainData
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.kindCd.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item, index) => {
                  return (
                    <div key={index}>
                      <Col>
                        <Card>
                          <Card.Img
                            style={{
                              width: "100%",
                              height: "300px",
                            }}
                            variant="top"
                            src={item.popfile}
                          />
                          <Card.Body>
                            <Card.Title style={{ textAlign: "center" }}>
                              {item.kindCd}
                            </Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                              보호소:{item.careNm}
                            </Card.Text>
                            <Card.Text style={{ textAlign: "center" }}>
                              특징:{item.specialMark}
                            </Card.Text>
                            <Card.Text style={{ textAlign: "center" }}>
                              몸무게:{item.weight}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  );
                })}
          </Row>
        </MainContentsContainer>
      </MainContainer>
    </main>
  );
}
const MainSearchInput = styled.input`
  width: 16vw;
  height: 5vh;
  font-size: 15px;
  border-radius: 20px;
  padding-left: 10px;
  outline: 1px solid gray;
  font-weight: 600;
`;

const RadioDiv = styled.div`
  width: 16vw;
`;

const MainSearchDiv = styled.div`
  padding-top: 30px;
  font-family: "GangwonEduPowerExtraBoldA";
  width: 80vw;
  height: 10vh;
  margin-left: 16vw;
  display: flex;
  justify-content: space-between;
  padding-right: 10vw;
  input[type="radio"] {
    accent-color: black;
  }
`;
const MainContainer = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const MainContentsContainer = styled.div`
  width: 70vw;
  margin-left: 15vw;
  margin-top: 5vh;
  font-family: "GangwonEduPowerExtraBoldA";
  a {
    color: black;
    text-decoration: none;
  }
`;

export default Debounce;
