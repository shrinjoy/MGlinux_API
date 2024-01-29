import os 
import tkinter
import sys;
from tkinter import *
from tkinter import messagebox
import subprocess
root = Tk()
root.title("magic deluxe")
root.geometry('1024x768+100+100')
root.minsize(1024, 768)
root.maxsize(1024, 768)
root.configure(background="yellow")
#root.overrideredirect(True)
isconnected = False

import requests

def has_internet_connection():
    try:
        response = requests.get("http://www.google.com", timeout=5)
        return response.status_code == 200
    except requests.ConnectionError:
        return False
    




networkstatus = Label(root, text="Not connected to server",font=("Aerial",20,"bold"),foreground="red",background="yellow")
networkstatus.place(x=1024/3,y = 768/2)

usernameentry=Entry(root,foreground="black",background="white",font=("Aerial",20,"bold"))
passwordentry=Entry(root,foreground="black",background="white",font=("Aerial",20,"bold"))
def checkifcanlogin():

    jsonobj = {"username":str(usernameentry.get()),
               "password":str(passwordentry.get())
               }
    res = requests.post("http://localhost:3000/canlogin",json=jsonobj)
    resjson = res.json()

    if res.status_code == 200:
        subprocess.run(["python", "./app.py", usernameentry.get(), passwordentry.get()])
        root.iconify();
        root.destroy()
        
        
    if res.status_code == 400:
        messagebox.showinfo("Alert","Failed to login wrong username or password");
        
    

    
loginbutton =  Button(root,text="login",background="white",foreground="black",font=("Aerial",15,"bold"),command=checkifcanlogin)

def connectoserver():

    if has_internet_connection() == True:
        networkstatus.config(text="connected to server",foreground="yellow")

        usernameentry.place(x=1024/3,y=768/2,width=200,height=25)
        passwordentry.place(x=1024/3,y=(768/2)+30,width=200,height=25)
        loginbutton.place(x=1024/3,y=(768/2)+80)

      
    if has_internet_connection() == False:
        networkstatus.config(text="no internet failed to connect to server")
        
 

connect = Button(root,text="Connect",background="white",foreground="black",command=connectoserver,font=("Aerial",15,"bold")).place(x=50,y=700)




root.mainloop()

