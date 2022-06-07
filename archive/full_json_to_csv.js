const fs = require('fs');
let assert = require('node:assert');

function timeToSeconds(timeStr) {
  let [h, m, s] = timeStr.split(":");
  let [hh, mm, ss] = [h, m, s].map((x) => parseInt(x));
  let value = hh * 60 * 60 + mm * 60 + ss;
  return value;
}

function main() {

    let baseTime = timeToSeconds("7:00:00");
    let timeChunk = timeToSeconds("0:5:00");

    try {
        const json_data = fs.readFileSync('./data/json/2022_full.json', 'utf8');
        let json = JSON.parse(json_data);

        let times = [];

        for (let item of json) {
            let finish_time = item.details.at_42_2.time_of_day; 
            if (finish_time !== null) {
                times.push(finish_time);
                let timeInSec = timeToSeconds(finish_time) - baseTime;
                //times.push(timeInSec);
            }
        }

        console.log(times.join("\n"));

        let hBuckets = [];
        let curBucket = timeChunk;
        let currentCount = 0;
        for (let time of times) {
          if (time <= curBucket) {
            currentCount += 1;
          } else {
            hBuckets.push([curBucket, currentCount]);
            currentCount = 0;
            curBucket += timeChunk;
          }
        }
        hBuckets.push([curBucket, currentCount]);

        for (let bucket of hBuckets) {
          //console.log(bucket[1]);
        }

        //times[times.length - 1] += ",";
        //fs.writeFileSync('./data/finish_times/2022_full_finish.csv', times.join(",\n"));

      } catch (err) {
        console.error(err);
      }

}

main();