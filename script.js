import fetch from "node-fetch";
import fs from "fs";

async function fetchHistoricalData(market, date) {
  const url = `https://api.dydx.exchange/v3/historical-funding/${market}?effectiveBeforeOrAt=${date}`;
  const response = await fetch(url);
  return await response.json();
}

async function main() {
  // Start with today's date or a more recent date
  let lastDate = '2023-09-09T09:00:00.000Z';

  const market = 'DOGE-USD';
  let allData = [];

  for (let i = 0; i < 5; i++) {  // You can adjust this loop for how many times you want to query
    const historicalData = await fetchHistoricalData(market, lastDate);

    // Assuming historicalData is an array of objects
    allData = allData.concat(historicalData.historicalFunding);

    // Update lastDate to the earliest date in the fetched data for the next loop
    lastDate = historicalData.historicalFunding[historicalData.historicalFunding.length - 1].effectiveAt;
  }

  // Save to JSON file
  fs.writeFileSync('all_historical_funding.json', JSON.stringify({historicalFunding: allData}, null, 2));
  console.log('Saved all historical funding data to all_historical_funding.json');
}

main();