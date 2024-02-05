import os 
import tkinter
import sys;
from tkinter import *
from tkinter import messagebox
import requests
import random
import time
gamedate = str(sys.argv[1]);
gametime = str(sys.argv[2]);
gameid = str(sys.argv[3]);




root = Tk()
root.title("magic deluxe")
root.geometry('1024x768+100+100')
root.minsize(1024, 768)
root.maxsize(1024, 768)
#root.overrideredirect(True)
root.configure(background="blue")



titlemagic = Label(root,text="Magic Deluxe",font=("Aerial",50,"bold"),foreground="yellow",background="blue").place(x=1024/3,y=0);

Datetext= Label(root,text="Date"+gamedate,font=("Aerial",20,"bold"),foreground="yellow",background="blue").place(x=1024/4,y=100);
timetext= Label(root,text="Time"+gametime,font=("Aerial",20,"bold"),foreground="yellow",background="blue").place(x=700,y=100);

minormgtext= Label(root,text="MINOR MG",font=("Aerial",20,"bold"),foreground="white",background="blue").place(x=1024/4,y=250);
gametimetext= Label(root,text="TIME"+gametime,font=("Aerial",20,"bold"),foreground="white",background="blue").place(x=700,y=250);


result= Label(root,text="MG95",font=("Aerial",90,"bold"),foreground="red",background="yellow")



def exitresultwindow():
    root.iconify();
    root.destroy();
    END

def update():

    jsonobj = {"gameid":str(gameid)}
    respo = requests.post("http://localhost:3000/getresultbyid",json=jsonobj)
    respojson = respo.json()

    if(respo.status_code == 404):
       
        result.config(text="MG"+str(random.randint(0, 9))+str(random.randint(0, 9)))
  

        END
    if(respo.status_code == 200):
       
        for x in range(40):
            result.config(text=str(respojson["result"]))
        END



        result.config(text=str(respojson["result"]))
        root.after(5000,exitresultwindow);
        #root.destroy();
        END


    root.after(1000, update)
    END



root.after(0, update)

result.place(x=350,y=300);
root.mainloop();