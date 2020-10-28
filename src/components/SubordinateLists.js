import React, { useState } from 'react';

const SubordinateLists = ({ empLists = []}) => {
//const [subList, setSubList] = useState([]);
  return empLists.map((item, index) => {
    return <li className="listItem" key={index}>
       {item}
    </li>;
  });
};

export default SubordinateLists;
  