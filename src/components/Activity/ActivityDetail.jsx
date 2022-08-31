import React from "react";
import styled from "styled-components";
import moment from 'moment';
import axios from "axios";

const endpoint = "https://aircall-job.herokuapp.com/activities";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Number = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CallDescription = styled.div`
  color: lightgrey;
`;

const Time = styled.div`
  margin-left: auto;
  display: flex;
  color: lightgray;
  font-weight: bold;
  text-transform: uppercase;
`;

const AMPM = styled.div`
  border: 1px solid lightgray;
  border-right: none;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 4px;
  font-size: 10px;
`;

const Digits = styled.div`
  font-size: 12px;
  line-height: 20px;
  padding-right: 10px;
`;

const ArchiveButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  border: none;
  color: lightgray;
  background: transparent;
`;

export default ({ activity, refreshActivity }) => (
  <Wrapper>
    <Description>
      <Number>{activity.from}</Number>
      <CallDescription>
        {activity.call_type === "answered"
          ? "called on"
          : activity.call_type === "missed"
          ? "tried to call on"
          : "left voicemail"}{" "}
        {activity.to}
      </CallDescription>
    </Description>
    <Time>
      <Digits>{moment(activity.created_at).format("hh:mm")}</Digits>
      <AMPM>{moment(activity.created_at).format("a")}</AMPM>
    </Time>
    <ArchiveButton
      onClick={async () => {
        axios
          .post(`${endpoint}/${activity.id}`, { is_archived: true })
          .then((res) => {
            window.location.href = "/";
          })
          .catch((err) => {
            console.log("error", err);
          });
        
      }}
    >
      <small style={{color: "red"}}>Archive</small>
    </ArchiveButton>
  </Wrapper>
);
