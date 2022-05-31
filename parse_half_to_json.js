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

const MAX_FILE = 205;
const YEAR = 2022;

function main() {
  let data_obj = [];
  for (let f = 0; f <= MAX_FILE; f++) {
    try {
      const data = fs.readFileSync(`./data/2022_half/${f}.txt`, 'utf8');
      let root = HTMLParser.parse(data);
      let table = root.querySelector("tbody.ui-datatable-data.ui-widget-content");
      let rows = table.childNodes;
      
      // For every runner details
      for (let r = 0; r < rows.length - 1; r += 2) {
        try {
          let cells = rows[r].querySelectorAll("td");
          assert.equal(cells.length, 11);
          let extra_cells = rows[r + 1].querySelector("td").querySelectorAll("tbody>tr");
          assert.equal(extra_cells.length, 7);
    
          data_obj.push(
            {
              bib: gs(cells[2]),
              name: gd("a", cells[3]),
              city: gs(cells[4]),
              category: gs(cells[5]),
              rank: gs(cells[6]),
              gender_place: gs(cells[7]),
              cat_place: gs(cells[8]),
              at_10: gs(cells[9]),
              at_21_1: gs(cells[10]),
              details: {
                at_8_4: {
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
                at_11: {
                  split_time: gs(extra_cells[2].childNodes[2]),
                  pace: gs(extra_cells[2].childNodes[3]),
                  distance: gs(extra_cells[2].childNodes[4]),
                  race_time: gs(extra_cells[2].childNodes[5]),
                  overall: gs(extra_cells[2].childNodes[6]),
                  gender: gs(extra_cells[2].childNodes[7]),
                  category: gs(extra_cells[2].childNodes[8]),
                  time_of_day: gs(extra_cells[2].childNodes[9]),
                },
                at_16: {
                  split_time: gs(extra_cells[3].childNodes[2]),
                  pace: gs(extra_cells[3].childNodes[3]),
                  distance: gs(extra_cells[3].childNodes[4]),
                  race_time: gs(extra_cells[3].childNodes[5]),
                  overall: gs(extra_cells[3].childNodes[6]),
                  gender: gs(extra_cells[3].childNodes[7]),
                  category: gs(extra_cells[3].childNodes[8]),
                  time_of_day: gs(extra_cells[3].childNodes[9]),
                },
                at_18_9: {
                  split_time: gs(extra_cells[4].childNodes[2]),
                  pace: gs(extra_cells[4].childNodes[3]),
                  distance: gs(extra_cells[4].childNodes[4]),
                  race_time: gs(extra_cells[4].childNodes[5]),
                  overall: gs(extra_cells[4].childNodes[6]),
                  gender: gs(extra_cells[4].childNodes[7]),
                  category: gs(extra_cells[4].childNodes[8]),
                  time_of_day: gs(extra_cells[4].childNodes[9]),
                },
                at_21_1: {
                  split_time: gs(extra_cells[5].childNodes[2]),
                  pace: gs(extra_cells[5].childNodes[3]),
                  distance: gs(extra_cells[5].childNodes[4]),
                  race_time: gs(extra_cells[5].childNodes[5]),
                  overall: gs(extra_cells[5].childNodes[6]),
                  gender: gs(extra_cells[5].childNodes[7]),
                  category: gs(extra_cells[5].childNodes[8]),
                  time_of_day: gs(extra_cells[5].childNodes[9]),
                },                                                                                         
              }
            }
          );

        } catch (e) {
          console.log(`error: f: ${f}, r: ${r}`);
          console.log(e);
        }
      }
    
    } catch (err) {
      console.error("err");
    
    }
  }
  
  fs.writeFileSync(`./data/json/${YEAR}_half.json`, JSON.stringify(data_obj));

}

main();