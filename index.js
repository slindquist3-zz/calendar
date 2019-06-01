const renderCalendar = () => {
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const renderTable = () => {
      const table = document.createElement('table');
      table.setAttribute("id", "table");
      document.body.prepend(table);
    }
    renderTable();

    const table = document.getElementById('table');
      //Declared here so that the table exists in the DOM.

    const renderDaysOfWeekHeaders = () => {
      const header = document.createElement('tr');
      header.setAttribute('id', 'tHeader');
      table.appendChild(header)
      const headerEl = document.getElementById('tHeader')

      for (let i = 0; i < daysOfWeek.length; i++) {
        let day = daysOfWeek[i];
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(day))
        headerEl.appendChild(th);
      }
    }

    let today = new Date();
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(today.getDate() - today.getDate() + 1);
      // This variable is used once as the argument for the initial call of renderDayRows. 
      // Subsquent renders pass the first day of each month. I think I could abstract this further. 

    const renderDayRows = (start) => {
      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const last = new Date(startYear, startMonth + 1, 0);
      const lastDate = last.getDate();
      let currentDay = 1;
      
      // Would try to avoid a nested loop in a future iteration, 
      // but in considering performance I know that the maximum iterations will be constant at 42, so I think it's safe here.
      for (let i = 0; i < 6; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
          const td = document.createElement('td');

          if ( i === 0 && j < start.getDay() || currentDay > lastDate) {

            td.appendChild(document.createTextNode(" "))
          } else {
            td.appendChild(document.createTextNode(currentDay))
            currentDay++
          }

          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
    }

    const renderMonthYearHeader = (start) => {
      const month = months[start.getMonth()]
      const year = start.getFullYear();
      const monthHeader = document.createElement('h1');
      monthHeader.appendChild(document.createTextNode(month + " " + year));
      document.body.prepend(monthHeader)
    }

    const clearTable = () => {
      table.innerHTML = "";
    }

    const clearMonthYearHeader = () => {
      const monthYear = document.getElementsByTagName('h1')[0];
      monthYear.remove();
    }

    const renderButtons = () => {
      const backButton = document.createElement("button");
      backButton.setAttribute("id", "back");
      backButton.appendChild(document.createTextNode("Back"));
      document.body.appendChild(backButton);

      const nextButton = document.createElement("button");
      nextButton.setAttribute("id", "next");
      nextButton.appendChild(document.createTextNode("Next"));
      document.body.appendChild(nextButton);
    }

    const initButtonEvents = () => {
      const buttons = document.querySelectorAll('button');

      for (let i = 0; i < buttons.length; i++) {
          let self = buttons[i];

          self.addEventListener('click', function (event) {  
              event.preventDefault();
              clearTable();
              renderDaysOfWeekHeaders();
              clearMonthYearHeader();

              if (event.target.id === 'back') {

                if (today.getMonth() === 12) {
                  today = new Date(today.getFullYear() - 1, today.getMonth() - 1, 1);
                } else {
                  today = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                }

              } else if (event.target.id === 'next') {

                if (today.getMonth() === 11) {
                  today = new Date(today.getFullYear() + 1, 0, 1);
                } else {
                  today = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                }
              }
              
              renderMonthYearHeader(today);
              renderDayRows(today)

          }, false);
      }
    }

    //calls for the initial render
    renderDaysOfWeekHeaders();
    renderButtons();
    initButtonEvents();
    renderMonthYearHeader(today);
    renderDayRows(firstDayOfMonth);

};

renderCalendar();
