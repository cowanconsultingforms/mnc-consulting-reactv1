import React, { useState, useCallback } from "react";
import { db } from "../../firebase";

export const useQueryString = ({key}) => {
  const [data, setData] = useState("");
  const [paramValue, setParamValue] = useState(getQueryParamValue(key));
  const userRef = db.collection("users");
  const onSetValue = useCallback(
    (newValue) => {
      setParamValue(newValue);
      updateQueryStringWithoutReload(newValue ? `${key}=${newValue}` : "");
    },
    [key, setParamValue]
  );
  const getQueryParamValue = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  const updateQueryStringWithoutReload = (queryString) => {
    const { protocol, host, pathname } = window.location;
    const newUrl = `${protocol}//${host}${pathname}?${queryString}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };
  return [paramValue, onSetValue];
};

export default useQueryString;