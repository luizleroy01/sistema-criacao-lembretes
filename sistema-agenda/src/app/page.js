'use client';
import React,{ useState } from 'react';

export default function Home(){
    const [reminderList,setReminderList] = useState([])
    const [name,setName] = useState()
    const [date,setDate] = useState()
    const [invalid,setInvalid] = useState(false)
    
    const addReminder = (e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const date = e.target.date.value;

        setName("")
        setDate("")

        const dateValid = isValidDateFormat(date);
        const isFuture = verifyFutureDate(date);
        
        if(dateValid && isFuture){
           
            let newReminder = null;
            let searchReminder = reminderList.filter(reminder => (reminder.date === date))

            if(searchReminder.length > 0){
               reminderList.forEach((reminder)=>{
                if(reminder.date === date){
                    reminder.reminders.push(name);
                    }
                })
                setReminderList(reminderList);
            }else{
                newReminder = {
                    date : date,
                    reminders:[],
                }
                newReminder.reminders.push(name)
                reminderList.push(newReminder);
                reminderList.sort(function(a,b){
                    let dateA = convertDateFormat(a.date);
                    let dateB = convertDateFormat(b.date);
                    return dateA - dateB;

                })
                setReminderList(reminderList);
            }
        }else{
            setInvalid(true);
        }
        const sortedList = [];
    }
    const convertDateFormat = (date)=>{
        let dateString = date.split('/')
        let dateFormat = dateString[2] + '-' + dateString[1] + '-' + dateString[0];
        return new Date(dateFormat);
    }
    const isValidDateFormat = (dateString) => {
        // Regular expression to match the format dd/mm/yyyy
        const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
        // Check if the date string matches the format
        if (dateFormat.test(dateString)) {
            // Extract day, month, and year from the date string
            const parts = dateString.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                return true;
            }
        }
        return false;
    }

    const verifyFutureDate = (date)=>{
        const dateToday = new Date()
        const dateReminder = convertDateFormat(date)
        let timeReminder = dateReminder.getTime();
        let timeToday = dateToday.getTime()

        if(timeToday < timeReminder){
            return true;
        }
        return false;
    }

    const deleteReminder = (reminderDel,date)=>{
        let list = [...reminderList];
        
        list.map((rem)=>{
            if(rem.date === date){
                rem.reminders = rem.reminders.filter(rem=>
                    (rem !== reminderDel))
            }
            
        })
        
        list = list.filter(rem=>(rem.reminders.length > 0))
        console.log(list);
        setReminderList(list);
        
    }

    return(
        <>
        {invalid && (
            <div className="p-4 max-w-2xl flex space-x-3.5 mx-auto bg-red-100 rounded-xl shadow-lg my-10">
                <h2 className="font-bold text-xl my-5">
                    A data está em um formato inválido ou está
                    no passado
                </h2>
                <button className="shadow  bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold px-5 rounded" 
                    onClick={()=>setInvalid(false)}>
                        OK
                </button>
            </div>
        )}
        <section className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
                <h2 className="font-bold text-2xl my-5">Novo lembrete</h2>
                <form onSubmit={addReminder} className="w-full max-w-2lg">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/6">
                            <label className="block text-gray-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                Nome
                            </label>
                        </div>
                            <div className="md:w-5/6">
                                <input  className="bg-gray-200 text-xl appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  
                                type="text" 
                                name="name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                placeholder='Nome do lembrete'
                                required
                                />
                            </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/6">
                            <label className="block text-gray-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Data
                            </label>
                            </div>
                            <div className="md:w-5/6">
                                <input className="bg-gray-200 text-xl appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  
                                    type="text"
                                    name="date"
                                    value={date}
                                    onChange={(e)=>setDate(e.target.value)} 
                                    placeholder="Data do lembrete (formato dd/mm/yyyy)"
                                    required
                                />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/6"></div>
                        <div className="md:w-5/6">
                            <button className="shadow text-xl bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                Criar
                            </button>
                        </div>
                    </div>
                </form>
        </section>

        <section className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
            <h2 className="font-bold text-2xl my-5">Lista de lembretes</h2>
            {reminderList && reminderList.map((reminder)=>(
                <div key={reminder.date} className="p-4 max-w-4xl mx-auto bg-gray-200 rounded-xl shadow-lg my-4">
                    <h2 className="font-bold text-xl underline">{reminder.date}</h2>
                    <ul>
                        {reminder.reminders && reminder.reminders.map((rem)=>(
                            <li key={rem}>
                                <div className="flex space-x-2.5 my-2.5">
                                    <p className="text-2xl md:w-5/6">{rem}</p>
                                    <button className="text-lg text-white bg-red-500 hover:bg-red-400 rounded-lg p-0.5 md:w-1/6" onClick={()=>deleteReminder(rem,reminder.date)}>excluir</button>
                                </div>
                            </li>

                        ))}
                    </ul>
                    
                </div>
            ))}
        </section>
            
        </>
    )
}