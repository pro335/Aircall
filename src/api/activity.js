import axios from "axios";

const activityList_endpoint = "https://aircall-job.herokuapp.com/activities";

const activityList = async () => {
  return await axios
    .get(activityList_endpoint)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("error", err);
    });
};

module.exports = {
  activityList: activityList,
};
