// Load data from the JSON file
let dataTable = [
    { time_range: "00:00-03:59", column1: 9, column2: 9, column3: 9, column4: 9, column5: 9, column6: 9, column7: 9 },
    { time_range: "04:00-04:59", column1: 10, column2: 10, column3: 10, column4: 10, column5: 9, column6: 9, column7: 9 },
    { time_range: "05:00-05:59", column1: 12, column2: 12, column3: 12, column4: 12, column5: 11.5, column6: 11, column7: 10.5 },
    { time_range: "06:00-06:59", column1: 13, column2: 13, column3: 12, column4: 12, column5: 11.5, column6: 11, column7: 10.5 },
    { time_range: "07:00-11:59", column1: 14, column2: 14, column3: 13, column4: 13, column5: 12.5, column6: 12, column7: 11.5 },
    { time_range: "12:00-12:59", column1: 13, column2: 13, column3: 13, column4: 13, column5: 12.5, column6: 12, column7: 11.5 },
    { time_range: "13:00-16:59", column1: 12, column2: 12, column3: 12, column4: 12, column5: 11.5, column6: 11, column7: 10.5 },
    { time_range: "17:00-21:59", column1: 12, column2: 12, column3: 11, column4: 11, column5: 10, column6: 9, column7: 9 },
    { time_range: "22:00-22:59", column1: 11, column2: 11, column3: 10, column4: 10, column5: 9, column6: 9, column7: 9 },
    { time_range: "23:00-23:59", column1: 10, column2: 10, column3: 10, column4: 9, column5: 9, column6: 9, column7: 9 }
  ];

const stateToTimeZone = {
    Alabama: "America/Chicago",
    Alaska: "America/Anchorage",
    Arizona: "America/Phoenix",
    Arkansas: "America/Chicago",
    California: "America/Los_Angeles",
    Colorado: "America/Denver",
    Connecticut: "America/New_York",
    Delaware: "America/New_York",
    Florida: "America/New_York",
    Georgia: "America/New_York",
    Hawaii: "Pacific/Honolulu",
    Idaho: "America/Denver",
    Illinois: "America/Chicago",
    Indiana: "America/Indiana/Indianapolis",
    Iowa: "America/Chicago",
    Kansas: "America/Chicago",
    Kentucky: "America/New_York",
    Louisiana: "America/Chicago",
    Maine: "America/New_York",
    Maryland: "America/New_York",
    Massachusetts: "America/New_York",
    Michigan: "America/Detroit",
    Minnesota: "America/Chicago",
    Mississippi: "America/Chicago",
    Missouri: "America/Chicago",
    Montana: "America/Denver",
    Nebraska: "America/Chicago",
    Nevada: "America/Los_Angeles",
    New_Hampshire: "America/New_York",
    New_Jersey: "America/New_York",
    New_Mexico: "America/Denver",
    New_York: "America/New_York",
    North_Carolina: "America/New_York",
    North_Dakota: "America/Chicago",
    Ohio: "America/New_York",
    Oklahoma: "America/Chicago",
    Oregon: "America/Los_Angeles",
    Pennsylvania: "America/New_York",
    Rhode_Island: "America/New_York",
    South_Carolina: "America/New_York",
    South_Dakota: "America/Chicago",
    Tennessee: "America/Chicago",
    Texas: "America/Chicago",
    Utah: "America/Denver",
    Vermont: "America/New_York",
    Virginia: "America/New_York",
    Washington: "America/Los_Angeles",
    West_Virginia: "America/New_York",
    Wisconsin: "America/Chicago",
    Wyoming: "America/Denver",
    District_of_Columbia: "America/New_York",
};

document.getElementById("converter-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const { DateTime } = luxon;

  // Get user inputs
  const startTime = document.getElementById("start-time").value;
  const startState = document.getElementById("start-state").value;
  const baseState = document.getElementById("base-state").value;
  const columnNumber = parseInt(document.getElementById("column-number").value);

  try {
    // Convert start time to base state's time zone
    const startZone = stateToTimeZone[startState];
    const baseZone = stateToTimeZone[baseState];

    const convertedTime = DateTime.fromISO(startTime, { zone: startZone }).setZone(baseZone);

    // Find matching row in the table
    const match = dataTable.find((row) => {
      const [start, end] = row.time_range.split("-");
      const startTime = DateTime.fromFormat(start, "HH:mm", { zone: baseZone });
      const endTime = DateTime.fromFormat(end, "HH:mm", { zone: baseZone });
      return convertedTime >= startTime && convertedTime <= endTime;
    });

    // Get the output value
    if (match) {
      const output = match[`column${columnNumber}`];
      document.getElementById("result").innerText = `Duty Period (hours): ${output}`;
    } else {
      document.getElementById("result").innerText = "No matching time range found.";
    }
  } catch (error) {
    document.getElementById("result").innerText = `Error: ${error.message}`;
  }
});