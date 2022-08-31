import React, { useState, useEffect } from "react";
import moment from 'moment';
import styled from "styled-components";
import ActivityDetail from "./ActivityDetail.jsx";
import axios from "axios";

const endpoint = "https://aircall-job.herokuapp.com/activities";
const endpoint_reset = "https://aircall-job.herokuapp.com/reset";

const DateListWrapper = styled.div`
  margin: 10px;
`;

const ActivityDetailWrapper = styled.div`
  margin-bottom: 10px;
`;

const DateWrapper = styled.div`
  text-align: center;
  color: lightgrey;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const ResetButton = styled.button`
  width: 100%;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  background: palevioletred;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

export default () => {

  const [activities, setActivities] = useState([]);
  const [dateIndexedActivities, setDateIndexedActivities] = useState({});


  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setActivities(res.data);
      })
      .catch((err) => {
        console.log("error", err);
        setActivities([]);
      });
  }, []);

  useEffect(() => {
    const temp_dateIndexedActivities = {};
    activities.reduce((acc, activity) => {
      if (!activity.is_archived) {
        const date = moment(activity.created_at).format("YYYY/MM/DD");
        (acc[date] = acc[date] || []).push(activity);
      }
      return acc;
    }, temp_dateIndexedActivities);
    setDateIndexedActivities(temp_dateIndexedActivities);
  }, [activities])

  return (
    <DateListWrapper>
      {Object.keys(dateIndexedActivities).map(date => (
        <div key={date}>
          <DateWrapper>{moment(date).format("MMMM, DD YYYY")}</DateWrapper>
            {dateIndexedActivities[date]
              .sort(
                (a, b) =>
                  new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
              )
              .map(activity => (
                <ActivityDetailWrapper key={activity.id}>
                  <ActivityDetail
                    activity={activity}
                    refreshActivity={activity =>
                      setActivities(
                        activities.map(a =>
                          a.id === activity.id ? activity : a
                        )
                      )
                    }
                  />
                </ActivityDetailWrapper>
              ))}
        </div>
      ))}
      {activities.findIndex(a => !a.is_archived) === -1 && (
        <ResetButton
          key="reset"
          type="button"
          onClick={() => {
            axios
              .get(endpoint_reset)
              .then((res) => {
                window.location.href = "/";
              })
              .catch((err) => {
                console.log("error", err);
              });
          }}
        >
          Reset Activities
        </ResetButton>
      )}
    </DateListWrapper>
  );
};
