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
  const [subord, setSubord] = useState({});
  const [noRecord, setNoRecord] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle Search Input change
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if(!event.target.value){
      setError(true);
    }else{
      setError(false);
    }
  };

  // recursive call
  useEffect(() => {
    if (subord.length > 0) {
      subord.map((item) => {
        getSubordinates(item);
      });
    }
  }, [subord]);

  const getSubordinates = async (term) => {
    try {
      const res = await getSubordinateList(term);
      if (res === "404") {
        setNoRecord(true);
        return false;
      }
      setNoRecord(false);
      if (res.data[1] && res.data[1]["direct-subordinates"]) {
        setSubord(res.data[1]["direct-subordinates"]);
        dispatch(updateList([...res.data[1]["direct-subordinates"]]));
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  // submit handler
  const submitHandler = async () => {
    if(!searchTerm){
      setError(true);
      return;
    }
    setIsLoading(true);
    await getSubordinates(searchTerm);
  };

  const isSubordinat = subordinates.length > 0 && !isLoading;
  return (
    <div className={styles.employee}>
      <h2 className={styles.title}>
        Find the lists of All direct and non- direct subordinates
      </h2>
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
        {error && <Fragment><br/><div className={styles.error}>Search Feild can not be blank</div></Fragment>}
      </div>
      {isSubordinat ? (
        <div className={styles.employeeLists}>
          <h2>{`All teams members of "${searchTerm}"`}</h2>
          <ul className="list">
            <SubordinateLists empLists={subordinates} />
          </ul>
        </div>
      ) : (
        <div className={styles.please}>
          {!noRecord && <span>Please enter employee name for Search</span>}
          {noRecord && <span><b>No Result Found</b>, Please Enter correct Name</span>}
        </div>
      )}
    </div>
  );
};

export default App;
