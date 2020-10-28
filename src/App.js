import React, { Fragment, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import updateList from "./actions/actions";
import getSubordinateList from "./api/api";
import styles from "./App.module.scss";
import SubordinateLists from "./components/SubordinateLists";

const App = () => {

  const { subordinates } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  //const [subordinates, setSubordinates] = useState([]);
  const [subord, setSubord] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if(subord.length > 0) {
      subord.map((item)=>{
      getSubordinates(item);
    })
  }
  }, [subord]);

  const getSubordinates = async (term) => {
    try {
      const res = await getSubordinateList(term);
      console.log('subordinates-0', subordinates);
      if(res.data[1] && res.data[1]["direct-subordinates"]){
       //console.log('subordinates-1', subordinates, ...res.data[1]["direct-subordinates"]);
       //const uniqValue = new Set([...subordinates, ...res.data[1]["direct-subordinates"]]);
        //setSubordinates([...res.data[1]["direct-subordinates"]]);
        setSubord(res.data[1]["direct-subordinates"]);
        dispatch(updateList([...res.data[1]["direct-subordinates"]]));
        
      }
      console.log('subordinates-2', subordinates);
      setIsLoading(false);
    } catch (e) {
      console.log('subordinates1', e);
      console.log(e);
    }
  }

  const submitHandler = async () => {
    setIsLoading(true);
    await getSubordinates(searchTerm);
  };

const isSubordinat = subordinates.length > 0 && !isLoading;
  return (
    <div className={styles.employee}>
      <h1 className={styles.title}>Lists of All Book</h1>
      <div className={styles.employeeSearch}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <div className={styles.SearchBtn}>
          <button className={styles.btnPrimary} onClick={() => submitHandler()}>
            Search
          </button>
        </div>
      </div>
      { isSubordinat ? (
        <div className={styles.employeeLists}>
          <h2>{`All teams members of "${searchTerm}"`}</h2>
          <ul className="list">
            <SubordinateLists empLists={subordinates} />
          </ul>
        </div>
      ): <div className={styles.please}>Please enter employee name for Search</div>}
    </div>
  );
};

export default App;
