import * as $ from "jquery";
import { actionTypeEnum } from "./../enums/actionTypeEnum";

export function fetchData(url: string) {
    return dispatch => 
    $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json"
        }).then(
      response => response
    );
}

export function fetchAllData() {
  return dispatch => Promise.all([
    dispatch(fetchData("https://jsonplaceholder.typicode.com/posts")),
    dispatch(fetchData("https://jsonplaceholder.typicode.com/albums")),
    dispatch(fetchData("https://jsonplaceholder.typicode.com/users"))
  ]).then(
      response => dispatch({ type: actionTypeEnum[actionTypeEnum.fetchAllData], payload: response }),
      err => dispatch({ type: "error", err })
    );
}