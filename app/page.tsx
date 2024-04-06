"use client";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Spin, Card, Pagination, Avatar } from "antd";
import styled from "styled-components";
const Logo = require("../public/images/logo.png");

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background: linear-gradient(to bottom, #ffffff 0%, #ff99cc 100%);
  .logo-img {
    width: 50px;
    height: 50px;
  }
  .logoname {
    font-size: 18px;
    font-weight: 600;
  }
  .logo-container {
    display: flex;
    align-items: center;
    padding: 20px 0px 20px 20px;
  }
  .article-title {
    color: #080808;
    font-family: 'Poppins', sans-serif;
    font-size: "20px";
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .article-description {
    color: #080808;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 20px 0px 20px 0px;
  }
  .article-profile {
    display: flex;
    align-items: center;
  }
`;

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [pageValue, setPage] = useState(1);
  const [pageSizeValue, setPageSize] = useState(9);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      async function myFunction() {
        let el: any = document.getElementsByTagName("head");
        if (
          Array.from(el[0].children).some(
            (element: any) => element.tagName == "title"
          )
        ) {
          console.log({ meta: true });
        } else {
          console.log({ meta: false });
          var x: any = document.createElement("title");
          x.innerHTML =
            "The best Blogging Platform";
          document.head.appendChild(x);
          var x1 = document.createElement("meta");
          x1.setAttribute("name", "viewport");
          x1.setAttribute("content", "width=device-width, initial-scale=1.0");
          document.head.appendChild(x1);
          var x2 = document.createElement("meta");
          x2.setAttribute("name", "description");
          x2.setAttribute(
            "content",
            "Explore the best article lists"
          );
          document.head.appendChild(x2);
        }
      }
      await myFunction();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://dev.to/api/articles?page=${pageValue}&per_page=${pageSizeValue}`,
        headers: {}
      };

      axios.request(config)
        .then((response: any) => {
          console.log({ Articles: response.data });
          setArticles(response?.data);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log(error);
          setLoading(false);
        });
    })();
  }, [pageValue, pageSizeValue]);

  return (
    <main>
      <Wrapper>
        <Spin tip="Loading.. Please Wait..." spinning={Loading}>
          <Row className="antd-logo-Row" align={"top"}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <div className="logo-container">
                <Image src={Logo} className="logo-img" alt="" /> &nbsp; &nbsp;
                <div className="logoname">AssessmentBlogger</div>
              </div>
            </Col>
          </Row>
          <Row gutter={[12, 12]} className="antd-logo-Row" align={"top"}>
            {articles?.length > 0 && articles.map((item: any) => (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Card
                  style={{
                    overflow: "hidden",
                    margin: "0px 10px 0px 10px",
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                    height: "40vh"
                  }}>
                  <Row align={"middle"}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <div className="cover-img">
                        <img src={item?.cover_image ?? item?.social_image} width="90%" height={"150vh"} />
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <Row align={"middle"} gutter={[12, 12]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          <Link  href={{ pathname: `/${item?.slug}`, query: {user:item?.user.username} }} className="article-title">
                            {item?.title}
                          </Link>
                        </Col>
                        {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <div className="article-description">
                          {item?.description}
                        </div>
                      </Col> */}
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}></Col>
                        {item?.organization?.name && (
                          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                            <div className="article-profile">
                              <Avatar icon={<img src={item?.organization?.profile_image ?? item?.organization?.profile_image_90} />} />
                              &nbsp;&nbsp;{item?.organization?.name}
                            </div>
                          </Col>
                        )}
                        <Col xs={12} sm={12} md={12} lg={16} xl={16} xxl={16} style={{ textAlign: item?.organization?.name ? "end" : "start" }}>
                          <div>
                            <b>Published On : </b>{moment(new Date(item?.published_timestamp).toISOString()).format("DD-MMM-YYYY")}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}
              style={{
                background: "#FFF", padding: "20px", textAlign: "center"
              }}
            >
              <Pagination
                defaultCurrent={6}
                total={500}
                onChange={(page: any, pageSize: any) => {
                  setPage(page);
                  setPageSize(pageSize);
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}></Col>
          </Row>
        </Spin>
      </Wrapper>
    </main >
  );
}
