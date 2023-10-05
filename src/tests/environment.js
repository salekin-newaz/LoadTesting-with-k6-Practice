import http from 'k6/http';
import {sleep} from 'k6';
import exec from "k6/execution";
import {check} from 'k6';

export default function () {
    //console.log(exec.vu.idInTest);
    console.info(`Iterations id ==>  ${exec.scenario.iterationInTest} VU id ==> ${exec.vu.idInTest}`);

    //const baseUrl = "https://reqres.in/api/users?page=2"
    console.log(__ENV.HOST_URL)

    const res = http.get(__ENV.HOST_URL);
    check(res, {'is status 200': (r) => r.status === 200,});
    console.log(res);
     sleep(1);
}
