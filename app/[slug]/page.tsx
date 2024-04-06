"use client";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Collapse, Divider, Card, Space, Avatar, } from "antd";
import styled from "styled-components";
const commentsImage = require("../../public/images/comments.png");
const Right = require("../../public/images/right.png");
const Down = require("../../public/images/down.png");

const Wrapper = styled.div`
background-repeat: no-repeat;
background: radial-gradient(circle, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);
  .logo-img {
    width: 50px;
    height: 50px;
  }
  .highlight__panel-action {
    display: none;
  }
  a.article-body-image-wrapper {
    display: none;
  }
  h2 {
    padding: 30px 0px 10px 0px;
    display: block;
    font-size: 20px;
    font-weight: bold;
  }
  p {
    text-indent: 50px;
    padding: 10px 0px 10px 0px;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
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
    font-size: 30px;
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
  .comments {
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    background: #FFF;
  }
`;

const CommentWrapper = styled.div`
background: #fff;
  h2 {
    padding: 30px 0px 10px 0px;
    display: block;
    font-size: 20px;
    font-weight: bold;
  }
  p {
    text-indent: 0px;
    padding: 10px 0px 10px 0px;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
  }
`;
export default function slug(value: any) {
  const { params, searchParams } = value;
  const [article, setArticle] = useState<any>();
  const [comments, setComments] = useState<any>();
  const [Viewcomments, setViewComment] = useState<any>(false);

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
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://dev.to/api/articles/${searchParams?.user}/${params?.slug}`,
        headers: {}
      };

      await axios.request(config)
        .then(async (response: any) => {
          console.log({ Articles: response.data });
          setArticle(response?.data);

          await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://dev.to/api/comments?a_id=${response?.data.id}`,
            headers: {}
          })
            .then((response: any) => {
              setComments(response?.data)
            })
            .catch((error: any) => {
              console.log({ error });
            });
        })
        .catch((error: any) => {
          console.log({ error });
        });
    })();
  }, []);

  console.log({ article });
  console.log({ comments });
  return (
    <main>
      <Wrapper>
        <Row className="antd-logo-Row" align={"top"} style={{ padding: "10px 20px 10px 20px" }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ textAlign: "center" }}>
            <img src={article?.cover_image ?? article?.social_image} />
          </Col>
          {article?.user?.name && (
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <div className="article-profile">
                <Avatar icon={<img src={article?.user?.profile_image ?? article?.user?.profile_image_90} />} />
                &nbsp;&nbsp;{article?.user?.name}
              </div>
            </Col>
          )}
          <Col xs={12} sm={12} md={12} lg={16} xl={16} xxl={16} style={{ textAlign: article?.user?.name ? "end" : "start" }}>
            <div>
              <b>Published On : </b>{moment(new Date(article?.published_timestamp)).format("DD-MMM-YYYY")}
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ padding: "10px 20px 10px 20px" }}>
            <div>
              <div
                className="comments"
                style={{ width: "100%", padding: "10px 20px 10px 20px",cursor:"pointer" }}
                onClick={() => {
                  setViewComment(!Viewcomments)
                }}
              >
                <Image src={Viewcomments ? Down : Right} className="logo-img" alt="" style={{ width: "20px", height: "20px" }} /> &nbsp; &nbsp;
                <div className="logoname">View Comments</div>
              </div>
              <CommentWrapper>
                {Viewcomments && (
                  <Row className="antd-logo-Row" align={"top"} style={{ padding: "10px 20px 10px 20px" }}>
                    {comments?.length > 0 && comments.map((itemValue: any) => (
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}
                        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "10px 20px 10px 20px" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <Avatar icon={<img src={itemValue?.user?.profile_image ?? itemValue?.user?.profile_image_90} />} />
                            &nbsp;&nbsp;{itemValue?.user?.name}
                          </div>
                          <div>
                            <b>{moment(new Date(itemValue?.created_at)).format("DD-MMM-YYYY")}</b>
                          </div>
                        </div>
                        <Divider />
                        <div className="content" dangerouslySetInnerHTML={{ __html: itemValue?.body_html }}></div>
                        {itemValue?.children?.length > 0 && itemValue?.children?.map((reply: any) => (
                          <Row className="antd-logo-Row" align={"top"} 
                            style={{ 
                              padding: "10px 20px 10px 20px",
                            }}
                          >
                            <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
                            <Col 
                              xs={23} sm={23} md={23} lg={23} xl={23} xxl={23}
                              style={{ 
                                padding: "10px 20px 10px 20px",
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                  <Avatar icon={<img src={reply?.user?.profile_image ?? reply?.user?.profile_image_90} />} />
                                  &nbsp;&nbsp;{reply?.user?.name}
                                </div>
                                <div>
                                  <b>{moment(new Date(reply?.created_at)).format("DD-MMM-YYYY")}</b>
                                </div>
                              </div>
                              <Divider />
                              <div className="content" dangerouslySetInnerHTML={{ __html: reply?.body_html }}></div>
                            </Col>
                          </Row>
                        ))}
                      </Col>
                    ))}
                  </Row>
                )}
              </CommentWrapper>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ padding: "10px 20px 10px 20px" }}>
            <div className="content" dangerouslySetInnerHTML={{ __html: article?.body_html }}></div>
          </Col>
        </Row>
      </Wrapper>
    </main >
  );
}
