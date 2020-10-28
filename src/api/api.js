import axios from "axios";
import endPoint from "../constants/index";

const getSubordinateList = (searchTerm) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endPoint}/${searchTerm}`)
      .then((res) => {
        const status = res.statusText;
        if (status === "OK") {
          resolve(res);
          console.log("res", res);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        console.log(error);
        //Resolveing to show no record found
        resolve("404");
      });
  });
};
export default getSubordinateList;
