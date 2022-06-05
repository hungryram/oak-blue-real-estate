import * as React from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'gatsby'

const ScheduleTour = ({ listing }) => {

    const initDate = React.useMemo(() => new Date(), [])
    const [ contact, setContact ] = React.useState({name: '', email: '', phone: '', message: '' })
    const [ dateTime, setDateTime ] = React.useState(initDate)
    const [ confirm, setConfirm ] = React.useState(false)
    const [ disabled, setDisabled ] = React.useState(true)

    React.useEffect(() => {
        if(
            contact.name.length !== 0 &&
            contact.email.length !== 0 &&
            contact.phone.length !== 0 &&
            dateTime !== initDate &&
            confirm
        ){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }, [
      contact.name.length, 
      contact.email.length, 
      contact.phone.length, 
      dateTime, 
      initDate,
      confirm  
    ])

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

    let timeslot = {
        date: `${days[dateTime.getDay()]} ${months[dateTime.getMonth()]} ${dateTime.getDate()} ${dateTime.getFullYear()}`,
        time: dateTime.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    }

    const encode = (data) => {
        return Object.keys(data)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
          )
          .join("&");
      }

      const submitForm = (e) => {
        const formData = {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            message: contact.message,
            date: timeslot.date,
            time: timeslot.time,
            confirmation: confirm
        }
        e.preventDefault();
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": e.target.getAttribute("name"),
            ...formData
          }),
        })
        .then(
            setContact({name: '', email: '', phone: '', message: ''}),
            setDateTime(initDate),
            setConfirm(false)
        )
        .catch((error) => console.log(error))   
      };

    return(
        <form 
            className="flex flex-col m-2 lg:m-5 p-2 lg:p-8 rounded-sm shadow-lg"
            name="Request Tour"
            data-netlify="true"
            data-netlify-honeypot="bot-field" 
            method="POST"
            onSubmit={(e) => submitForm(e)}
        >
            <input type="hidden" name="bot-field" />
            <h1 className="text-3xl font-bold">Request A Tour</h1>
            <div className="flex flex-col lg:flex-row mt-4 py-4 border-t border-black/20 text-secondary">
                <div className="flex flex-col lg:p-4 lg:w-1/3">
                    <div className="flex flex-row items-center">
                        <span className="stepWrapper">1</span>
                        <span className="text-lg font-bold">Choose A Timeslot:</span>
                    </div>
                    <DatePicker
                        selected={dateTime}
                        onChange={(date) => setDateTime(date)}
    
                        showTimeSelect
                        inline
                    />
                </div>
                <div className="flex flex-col mt-8 lg:mt-0 lg:p-4 lg:w-2/3">
                    <div className="flex flex-row items-center">
                        <span className="stepWrapper">2</span>
                        <span className="text-lg font-bold">Enter Your Information:</span>
                    </div>
                    <div className="flex flex-col p-2 my-1">
                        <label 
                            htmlFor="schedule-tour-name"
                            className="font-bold text-primary text-lg"
                        >
                            Name*
                        </label>
                        <input
                            id="schedule-tour-name"
                            name="Request Tour"
                            placeholder="Enter Your Name"
                            value={contact.name}
                            onChange={(e) => setContact({ name: e.target.value, email: contact.email, phone: contact.phone, message: contact.message })} 
                            className="formInput my-1"
                            type="text" 
                        />
                        <label 
                            htmlFor="schedule-tour-email"
                            className="font-bold text-primary text-lg"
                        >
                            Email Address*
                        </label>
                        <input
                            id="schedule-tour-email"
                            name="Request Tour"
                            placeholder="Enter Your Email"
                            value={contact.email}
                            onChange={(e) => setContact({ name: contact.name, email: e.target.value, phone: contact.phone, message: contact.message })} 
                            className="formInput my-1"
                            type="email" 
                        />
                        <label 
                            htmlFor="schedule-tour-phone"
                            className="font-bold text-primary text-lg"
                        >
                            Phone*
                        </label>
                        <input
                            id="schedule-tour-phone"
                            name="Request Tour"
                            placeholder="Enter Your Phone #"
                            value={contact.phone}
                            onChange={(e) => setContact({ name: contact.name, email: contact.email, phone: e.target.value, message: contact.message })} 
                            className="formInput my-1"
                            type="tel" 
                        />
                        <label 
                            htmlFor="schedule-tour-message"
                            className="font-bold text-primary text-lg"
                        >
                            Message
                        </label>
                        <textarea
                            id="schedule-tour-message"
                            name="Request Tour"
                            placeholder="Enter Your Message"
                            value={contact.message}
                            onChange={(e) => setContact({ name: contact.name, email: contact.email, phone: contact.phone, message: e.target.value })} 
                            className="formInput my-1"
                            rows="6"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row items-center">
                <div className="lg:w-1/3 flex flex-row items-center justify-center">
                    <button
                        type="submit"
                        className={`p-3 text-xl rounded-md leading-none text-secondary text-textLight font-bold my-8 lg:my-0 ${disabled ? 'bg-primary/60' : 'bg-primary hover:bg-primary/90'}`} 
                        disabled={disabled ? true : false}
                    >
                        Submit
                    </button>
                </div>
                <div className="flex flex-row items-center lg:m-2 lg:p-4 lg:w-2/3"> 
                    <div className="m-2 flex flex-row items-center text-secondary">
                        <input 
                            id="schedule-tour-confirm-info" 
                            name="Request Tour"
                            onChange={confirm ? () => setConfirm(false) : () => setConfirm(true)}
                            value={confirm}
                            type="checkbox" 
                            className="cursor-pointer scale-125 mr-1" 
                        />*
                    </div>    
                    <label htmlFor="schedule-tour-confirm-info" className="text-secondary ml-2 text-sm leading-tight">I confirm that I would like to schedule a tour of the property listed at {listing} on {timeslot.date} at {timeslot.time}, understand that this form is only a request and that all tour schedulings must be confirmed by an agent, and have read and agree to the Oak Blue Real Estate <Link to="terms-of-service" className="text-primary hover:text-accent">terms of service</Link>.</label>
                </div>
            </div>
        </form>
    )
}

export default ScheduleTour