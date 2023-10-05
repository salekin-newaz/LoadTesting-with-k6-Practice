import http from 'k6/http';
import {sleep} from 'k6';
import exec from "k6/execution";
import {check} from 'k6';
import { Counter } from 'k6/metrics';

const allError= new Counter("error_count");

export const options = {
    thresholds: {
        error_count: [{threshold: 'count< 5', abortOnFail: true,}]
     },
    scenarios:{
     //    accountCreate:{
     //        executor:"per-vu-iterations",
     //        vus:1,
     //        iterations:10
 
     //    },
       //  accountCreate2:{
       //      executor:"shared-iterations",
       //      vus:10,
       //      iterations:10
        
       //  },
 
      
 
          // accountCreate3: {
          //    executor:"constant-vus",
          //    vus: 10,
          //    duration: '10s'
          // }
 
         smoke: {
             executor:"ramping-vus",
             startVUs: 0,
             stages:[
                 {duration:'20s', target:10},
                 {duration: '30s', target:10},
                 {duration: '0s', target:0},
             ],
                 gracefulRampDown: '30s'
         
 
          }
    }
}




export default function() {
    
    console.info(`Iterations id ==>  ${exec.scenario.iterationInTest} VU id ==> ${exec.vu.idInTest}`);

    const baseUrl = "https://reqres.in/"
    const endPoint = "api/unknown/23";

    const res = http.get(`${baseUrl}${endPoint}`);
    if(res.status>=400){
       allError.add(1); 
    }
    check(res, {'is status 200': (r) => r.status === 200,});
    console.log(res);
     sleep(1);
}
