window.onload = function ()
{
  var seconds = 00; 
  var tens = 00; 
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonReset = document.getElementById('button-reset');
  let table = document.getElementById('timeTable');
  let tbodyRef = table.getElementsByTagName('tbody')[0];
  var Interval;

  buttonStart.onclick = function()
  {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    recordData("start");
    disableEnableBtns();
  }
  
  buttonStop.onclick = function()
  {
    clearInterval(Interval);
    recordData("stop");
    recordData("diff");
    disableEnableBtns();
  }
  
  buttonReset.onclick = function()
  {
    clearInterval(Interval);
    tens = 00;
  	seconds = 00;
    appendTens.innerHTML = formatTwoPlaces(tens);
  	appendSeconds.innerHTML = formatTwoPlaces(seconds);
    resetTable();
  }
  
  function startTimer ()
  {
    tens++; 
    
    if(tens <= 9)
    {
      appendTens.innerHTML = formatTwoPlaces(tens);
    }
    
    if (tens > 9)
    {
      appendTens.innerHTML = tens;
    } 
    
    if (tens > 99)
    {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = formatTwoPlaces(seconds);
      tens = 0;
      appendTens.innerHTML = formatTwoPlaces(0);
    }
    
    if (seconds > 9)
    {
      appendSeconds.innerHTML = seconds;
    }
  }
  
  function recordData (op)
  {
    let row, cell, rowIndex, cellIndex, color, time;
    let timeSeconds, timeTens;
    
    timeSeconds = seconds;
    timeTens = tens;
    
    rowIndex = tbodyRef.rows.length - 1;

    if (op == "start")
    {
      cellIndex = 0;
      color = "green";
      row = tbodyRef.insertRow(-1);
    }
    else if (op == "stop")
    {
      cellIndex = 1;
      color = "red";
      row = tbodyRef.rows[rowIndex];
    }
    else if (op == "diff")
    {
      cellIndex = 2;
      let startTime, stopTime;
      color = "blue";
      row = tbodyRef.rows[rowIndex];
      
      startTime = row.cells[0].innerHTML.split(':');
      stopTime = row.cells[1].innerHTML.split(':');
      
      timeSeconds = stopTime[0] - startTime[0];
      timeTens = stopTime[1] - startTime[1];
      
      if (timeTens < 0)
      {
        timeTens = 100 + timeTens;
        timeSeconds--;
      }
      
      //console.log(timeSeconds + " = " + stopTime[0] + " - " + startTime[0]);
      //console.log(timeTens + " = " + stopTime[1] + " - " + startTime[1]);
    }
    
    if (timeSeconds < 10)
      timeSeconds = formatTwoPlaces(timeSeconds);
    if (timeTens < 10)
      timeTens = formatTwoPlaces(timeTens);
    
    time = timeSeconds + ':' + timeTens;
    
    cell = row.insertCell(cellIndex);
    cell.style.color = color;
    cell.innerHTML = time;
  }
  
  function resetTable ()
  { 
    tbodyRef.innerHTML = '';
  }
  
  function disableEnableBtns ()
  {
    buttonStart.disabled = !buttonStart.disabled;
    buttonStop.disabled = !buttonStop.disabled;
    buttonReset.disabled = !buttonReset.disabled;
  }

  function formatTwoPlaces (value)
  {
     return ("0" + value);
  }
  
}
