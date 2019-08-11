import React from "react";
import dateFns from "date-fns";


class Calendar extends React.PureComponent{

  state = {
    currentMonth: new Date(),
    selectedDates : [],
    isEditing : false
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return(
      <div>
        <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
      <div className = "header">
        <div className="col col-center">
          {this.state.isEditing ? "Seleziona la data di fine prenotazione" : "Seleziona la data di inizio prenotazione"}
        </div>
      </div>
    </div>
    )
  }
  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i<7; i++){
      days.push(
        <div className="col col-center" key = {i}>
          {dateFns.format(dateFns.addDays(startDate,i),dateFormat)};
        </div>
      )
    }
    return <div className = "days row">{days}</div>
  }
  renderCells() {
    const { currentMonth, selectedDates } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        // eslint-disable-next-line
        var isSelected = selectedDates.filter(selDay => dateFns.isSameDay(selDay,day)).length > 0;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : isSelected ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return  <div className = "body">{rows}</div>
  }

  onDateClick = day => {
    if(!this.state.isEditing){
      var month = dateFns.getMonth(day)
      if (month !== dateFns.getMonth(this.state.currentMonth)) {
        var nextMonth = dateFns.addMonths(this.state.currentMonth,1);
        if (month === dateFns.getMonth(nextMonth)){
          this.nextMonth();
        }
        else{
          this.prevMonth();
        }
      };
      this.setState({
        selectedDates: [day],
        isEditing : true
      });
    }
    else{
      if(dateFns.differenceInCalendarDays(this.state.selectedDates,day) < 0){
        month = dateFns.getMonth(day)
      if (month !== dateFns.getMonth(this.state.currentMonth)) {
        nextMonth = dateFns.addMonths(this.state.currentMonth,1);
        if (month === dateFns.getMonth(nextMonth)){
          this.nextMonth();
        }
        else{
          this.prevMonth();
        }
      const inizioPrenotazione = this.state.selectedDates[0];
      var tmpDay = inizioPrenotazione;
      console.log({tmpDay})
      var newDays = [];
      while(dateFns.differenceInCalendarDays(tmpDay,day)<=0){
        newDays.push(tmpDay);
        tmpDay = dateFns.addDays(tmpDay,1);
      }
      console.log({newDays});
      this.setState({
        selectedDates: newDays,
        isEditing : false
      });
      }
      
    }
    
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth,1)
    })
  }

  prevMonth = () =>{
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth,1)
    })
  }



  render(){
      return (
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        );
      }
    }
      
export default Calendar;