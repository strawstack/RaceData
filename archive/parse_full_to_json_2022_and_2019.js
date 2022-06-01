let assert = require('node:assert');
let HTMLParser = require('node-html-parser');
const fs = require('fs');

// Get data wrapped by a tag
function gd(tag, element) {
  try {
    let data = element.querySelector(tag).innerHTML;
    if (data == "") {
      return null;
    } else {
      return data;
    }
  } catch(e) {
    return null;
  }
}

// Get data wrapped by a span
function gs(element) {
  return gd("span", element);
}

const MAX_FILE = 87;
const YEAR = 2019;

function main() {
  let data_obj = [];
  for (let f = 0; f <= MAX_FILE; f++) {
    try {
      const data = fs.readFileSync(`./data/${YEAR}_full/${f}.txt`, 'utf8');
      let root = HTMLParser.parse(data);
      let table = root.querySelector("tbody.ui-datatable-data.ui-widget-content");
      let rows = table.childNodes;
      
      // For every runner details
      for (let r = 0; r < rows.length - 1; r += 2) {
        try {
          let cells = rows[r].querySelectorAll("td");
          assert.equal(cells.length, 15);
          let extra_cells = rows[r + 1].querySelector("td").querySelectorAll("tbody>tr");
          assert.equal(extra_cells.length, 10);
    
          data_obj.push(
            {
              bib: gs(cells[2]),
              name: gd("a", cells[3]),
              city: gs(cells[4]),
              country: gs(cells[5]),
              category: gs(cells[6]),
              rank: gs(cells[7]),
              gender_place: gs(cells[8]),
              cat_place: gs(cells[9]),
              at_10: gs(cells[10]),
              at_21_1: gs(cells[11]),
              at_30: gs(cells[12]),
              at_40: gs(cells[13]),
              at_42_2: gs(cells[14]),
              details: {
                at_5: {
                  split_time: gs(extra_cells[0].childNodes[2]),
                  pace: gs(extra_cells[0].childNodes[3]),
                  distance: gs(extra_cells[0].childNodes[4]),
                  race_time: gs(extra_cells[0].childNodes[5]),
                  overall: gs(extra_cells[0].childNodes[6]),
                  gender: gs(extra_cells[0].childNodes[7]),
                  category: gs(extra_cells[0].childNodes[8]),
                  time_of_day: gs(extra_cells[0].childNodes[9]),
                },
                at_10: {
                  split_time: gs(extra_cells[1].childNodes[2]),
                  pace: gs(extra_cells[1].childNodes[3]),
                  distance: gs(extra_cells[1].childNodes[4]),
                  race_time: gs(extra_cells[1].childNodes[5]),
                  overall: gs(extra_cells[1].childNodes[6]),
                  gender: gs(extra_cells[1].childNodes[7]),
                  category: gs(extra_cells[1].childNodes[8]),
                  time_of_day: gs(extra_cells[1].childNodes[9]),
                },
                at_15: {
                  split_time: gs(extra_cells[2].childNodes[2]),
                  pace: gs(extra_cells[2].childNodes[3]),
                  distance: gs(extra_cells[2].childNodes[4]),
                  race_time: gs(extra_cells[2].childNodes[5]),
                  overall: gs(extra_cells[2].childNodes[6]),
                  gender: gs(extra_cells[2].childNodes[7]),
                  category: gs(extra_cells[2].childNodes[8]),
                  time_of_day: gs(extra_cells[2].childNodes[9]),
                },
                at_21_1: {
                  split_time: gs(extra_cells[3].childNodes[2]),
                  pace: gs(extra_cells[3].childNodes[3]),
                  distance: gs(extra_cells[3].childNodes[4]),
                  race_time: gs(extra_cells[3].childNodes[5]),
                  overall: gs(extra_cells[3].childNodes[6]),
                  gender: gs(extra_cells[3].childNodes[7]),
                  category: gs(extra_cells[3].childNodes[8]),
                  time_of_day: gs(extra_cells[3].childNodes[9]),
                },
                at_25: {
                  split_time: gs(extra_cells[4].childNodes[2]),
                  pace: gs(extra_cells[4].childNodes[3]),
                  distance: gs(extra_cells[4].childNodes[4]),
                  race_time: gs(extra_cells[4].childNodes[5]),
                  overall: gs(extra_cells[4].childNodes[6]),
                  gender: gs(extra_cells[4].childNodes[7]),
                  category: gs(extra_cells[4].childNodes[8]),
                  time_of_day: gs(extra_cells[4].childNodes[9]),
                },
                at_30: {
                  split_time: gs(extra_cells[5].childNodes[2]),
                  pace: gs(extra_cells[5].childNodes[3]),
                  distance: gs(extra_cells[5].childNodes[4]),
                  race_time: gs(extra_cells[5].childNodes[5]),
                  overall: gs(extra_cells[5].childNodes[6]),
                  gender: gs(extra_cells[5].childNodes[7]),
                  category: gs(extra_cells[5].childNodes[8]),
                  time_of_day: gs(extra_cells[5].childNodes[9]),
                },
                at_35: {
                  split_time: gs(extra_cells[6].childNodes[2]),
                  pace: gs(extra_cells[6].childNodes[3]),
                  distance: gs(extra_cells[6].childNodes[4]),
                  race_time: gs(extra_cells[6].childNodes[5]),
                  overall: gs(extra_cells[6].childNodes[6]),
                  gender: gs(extra_cells[6].childNodes[7]),
                  category: gs(extra_cells[6].childNodes[8]),
                  time_of_day: gs(extra_cells[6].childNodes[9]),
                },
                at_40: {
                  split_time: gs(extra_cells[7].childNodes[2]),
                  pace: gs(extra_cells[7].childNodes[3]),
                  distance: gs(extra_cells[7].childNodes[4]),
                  race_time: gs(extra_cells[7].childNodes[5]),
                  overall: gs(extra_cells[7].childNodes[6]),
                  gender: gs(extra_cells[7].childNodes[7]),
                  category: gs(extra_cells[7].childNodes[8]),
                  time_of_day: gs(extra_cells[7].childNodes[9]),
                },
                at_42_2: {
                  split_time: gs(extra_cells[8].childNodes[2]),
                  pace: gs(extra_cells[8].childNodes[3]),
                  distance: gs(extra_cells[8].childNodes[4]),
                  race_time: gs(extra_cells[8].childNodes[5]),
                  overall: gs(extra_cells[8].childNodes[6]),
                  gender: gs(extra_cells[8].childNodes[7]),
                  category: gs(extra_cells[8].childNodes[8]),
                  time_of_day: gs(extra_cells[8].childNodes[9]),
                },                                                                                              
              }
            }
          );

        } catch (e) {
          console.log(`error: f: ${f}, r: ${r}`);
        }
      }
    
    } catch (err) {
      console.error(err);
    
    }
  }
  
  fs.writeFileSync(`./data/json/${YEAR}_full.json`, JSON.stringify(data_obj));

}

main();