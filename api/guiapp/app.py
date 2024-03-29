import asyncio
import json
import sys
import tkinter
from tkinter import *
import requests
from PIL import Image, ImageTk
import keyboard
import subprocess
import random;





username=str(sys.argv[1])
password=str(sys.argv[2])


nextgamedate="";
nextgametime="";
nextgameid="";


lastbarcode="none"

print("username"+username);
print("pass"+password);


def on_key_event(e):
    
    
    root.after(100,lambda: keyboard.hook(on_key_event))

    END



keyboard.hook(on_key_event)
    

root = Tk()
root.title("magic deluxe")
root.geometry('1024x768+100+100')
root.minsize(1024, 768)
root.maxsize(1024, 768)
root.configure(background="yellow")
#root.overrideredirect(True)
balancetext = Label(root, text="0000",font=("Aerial",10,"bold"),background="yellow")
playerterminalid = Label(root, text="P.No. "+str(username),font=("Aerial",10,"bold"),background="yellow")
playerterminalid.place(x=650,y = 40)
global timer
timer= 0

text = Label(root, text="Magic Deluxe", background="yellow", font=("Arial", 25, "bold"), fg="red")

text.place(x=70, y=0, width=250, height=40)

countdowntimer = 0
countdowntext = Label(root,text=countdowntimer, background="yellow", font=("Arial", 10,"bold"))
gifteventcode = Label(root,text="Gift Event Code \n", background="yellow", font=("Arial", 10,"bold"))
gifteventcode.place(x=0, y=50)

countdowntext.place(x=250, y=50)

balanceone = Entry(root,font=("Aerial",15,"bold"))
balanceone.insert(0,"0.00")
balanceone.place(x=600,y=660,width=80)
balancetwo = Entry(root,font=("Aerial",15,"bold"),background="green")
balancetwo.insert(0,"0.00")
balancetwo.place(x=690,y=660,width=80)


betentries = []

oldposx = 450
spacingx = 45
oldposy = 90
spacingy = 50



def updateuserdata():
    jsonobject = {"username":str(username),"password":str(password)}
    userdata = requests.post("http://localhost:3000/getalluserdata",json=jsonobject)
    print(userdata);
    jsondecrypt = userdata.json()
    if  userdata.status_code == 200:
        balancetext.config(text=str(jsondecrypt["balance"]));
        END
    if userdata.status_code == 404:
        balancetext.config(text="0000")
        END

    END
updateuserdata();


def only_number(char):
    return char.isdigit()
    END

entryvalidatenumber = root.register(only_number)

for y in range(10):
    oldposx = 450
    oldposy = oldposy + spacingy
    for x in range(10):
        label_text = "MG" + str(y) + str(x)
        Label(root,background="green", anchor="nw",text=label_text).place(x=oldposx, y=oldposy - 30, width=60, height=60)
        entry_widget = Entry(root, justify=CENTER,validate="key",validatecommand=(entryvalidatenumber,'%S'))
        entry_widget.place(x=oldposx, y=oldposy, width=40, height=20)
        betentries.append(entry_widget)
        oldposx = oldposx + spacingx

background_image = Image.open("background.png")
backgroundimage_width=300
backgroundimage_height=300
# Resize the image to fit within the desired dimensions (e.g., 200x200)
resized_image = background_image.resize((backgroundimage_width, backgroundimage_height))
# Convert the resized image to a PhotoImage
background_image = ImageTk.PhotoImage(resized_image)



# Create a label to display the resized background image
image_label = Label(root, image=background_image)
image_label.place(x=10, y=100, width=backgroundimage_width, height=backgroundimage_height)



def updatetime():
    global timer
    response = requests.get("http://localhost:3000/timeleft")
    jsontimerdata  = response.json()
    timer=(jsontimerdata['time'])
    gifteventcode.config(text="Gift Event Code \n"+str(jsontimerdata["gameid"]));
    
    END

def buyticket():

    updateuserdata();
    betstring = ""
    betindex = 0
    totalbet=0
    for bet in betentries:
        # Assuming bet.get() returns a string, you might want to convert it to an integer for comparison
        if bet.get().strip():
            if betindex > 0:
                betstring += ","
            END


            if betindex <10:
                betstring += "0"+str(betindex) + "Q" + str(bet.get())
                END
            if betindex >9:
                betstring += str(betindex) + "Q" + str(bet.get())
                END
            totalbet+=int(bet.get())
            bet.delete(0,tkinter.END)
        END
        betindex += 1
    END
    response = requests.get("http://localhost:3000/timeleft")
    jsontimerdata  = response.json()
    if(jsontimerdata['time'] >10):
            jsonobject = {"username":"ADMIN","password":"12345","tickets":str(betstring),"totalbet":totalbet,"gameid":jsontimerdata['gameid']}
            print(jsonobject)
            r=requests.post("http://localhost:3000/placebet",json=jsonobject)
            rdata = r.json()
            print(rdata["barcode"])
            global lastbarcode;
            lastbarcode=str(rdata["barcode"])
            print("betentries:"+betstring)
            print("totalbet:"+str(totalbet))
            print("bet placed")
            END
    updatetime();
    updateuserdata();
    balanceone.delete(0,tkinter.END);
    balancetwo.delete(0,tkinter.END);
    balanceone.insert(0,"0.00");
    balancetwo.insert(0,"0.00");
END


def clearbets():

    for bet in betentries:
         bet.delete(0,tkinter.END)
         END
    balanceone.delete(0,tkinter.END);
    balancetwo.delete(0,tkinter.END);
    balanceone.insert(0,"0.00");
    balancetwo.insert(0,"0.00");
END



def cancelticket():
    global lastbarcode
    jsonobj = {"barcode":str(lastbarcode)}
    cancelbarcodedata = requests.post("http://localhost:3000/cancelbybarcode",json=jsonobj);
    print(cancelbarcodedata.json());
    updatetime();
    updateuserdata();
    print("canceled the ticket");
    END

def getanyrandomentry():

    index = random.randint(0,len(betentries)-1)
    betentries[index].delete(0,tkinter.END);
    betentries[ index].insert(0,1);
    END

#stonebutton = Button(root,text="Stones",background="white",foreground="black",command=buyticket,font=("Aerial",15,"bold")).place(x=50,y=650)
luckystonebutton = Button(root,text="F2 Lucky Stone",background="white",foreground="black",command=buyticket,font=("Aerial",15,"bold")).place(x=150,y=650)

buybutton = Button(root,text="F6-Buy",background="red",foreground="black",command=buyticket,font=("Aerial",15,"bold")).place(x=50,y=700)
clearbutton = Button(root,text="F5-Clear",background="skyblue",command=clearbets,foreground="black",font=("Aerial",15,"bold")).place(x=150,y=700)
cancelticketbutton = Button(root,text="F5-Cancel",background="skyblue",foreground="black",font=("Aerial",15,"bold"),command=cancelticket).place(x=250,y=700)
lastreceiptbutton = Button(root,text="Last Reciept",background="skyblue",foreground="black",font=("Aerial",15,"bold")).place(x=380,y=700)
exitbutton = Button(root,text="Exit(X)",background="red",foreground="black",font=("Aerial",15,"bold")).place(x=680,y=700)
purchasedetails = Button(root,text="Purchase Details",background="white",foreground="black",font=("Aerial",10,"bold")).place(x=780,y=700)
stonesdetails = Button(root,text="F7 Stones",background="white",foreground="black",font=("Aerial",10,"bold")).place(x=920,y=700)

barcodelabeltext = Label(root, text="F8- \n barcode",font=("Aerial",10,"bold"),foreground="black",background="yellow").place(x=810,y= 660)
barcodeentry = Entry(root,font=("Aerial",10,"bold"))
luckystonebutton = Button(root,text="F2 Lucky Stone",background="white",foreground="black",command=getanyrandomentry,font=("Aerial",15,"bold")).place(x=150,y=650)


resultlistbox  = Listbox(root,font=("Aerial",20,"bold"),background="Red")



internetimage = Image.open("on.jpg")
internetimage_width=100
internetimage_height=100
# Resize the image to fit within the desired dimensions (e.g., 200x200)
resized_internetimage = internetimage.resize((internetimage_width, internetimage_height))
# Convert the resized image to a PhotoImage
internet_image = ImageTk.PhotoImage(resized_internetimage)



# Create a label to display the resized background image
internetimage_label = Label(root, image=internet_image)
internetimage_label.place(x=920, y=0, width=internetimage_width, height=internetimage_height)



def set_focus(event):
    barcodeentry.focus_set()
    



def get_all_result():
    response = requests.get("http://localhost:3000/getallresult")
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        json_data = response.json()
        # Create an iterator for the items
        items_iter = iter(json_data.items())
        # Iterate over pairs of keys and values, printing two entries per line
        resultlistbox.delete(0, tkinter.END)
        for (key1, value1), (key2, value2) in zip(items_iter, items_iter):
            resultlistbox.insert(tkinter.END,f"{key1}: {value1}     {key2}: {value2}")
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")

root.bind("B",set_focus);
barcodeentry.place(x=850,y=660,width=100)
resultlistbox.place(x=0,y=400,width=350,height=200)
get_all_result()





def format_timer(seconds):
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"


current_width=0;
candec = True;



card_image = Image.open("1.jpeg")

cardimage_width=200
cardimage_height=200
# Resize the image to fit within the desired dimensions (e.g., 200x200)
cardresized_image = card_image.resize((cardimage_width, cardimage_height))
# Convert the resized image to a PhotoImage
card_image = ImageTk.PhotoImage(cardresized_image)
# Create a label to display the resized background image
card_label = Label(root, image=card_image)
def animatecardimage():
    global current_width;
    global candec
    global card_image;
    global cardresized_image;
    global cardimage_width;
    global cardimage_height
    global card_label;
    if(candec==False):
       
        current_width+=1;
        
    END


    if(candec==True):
        current_width-=1;
          
    END

    if(current_width>190):
        candec=True;
    if(current_width<2):

        card_image = Image.open(str(random.randint(1,8))+".jpeg");
        cardresized_image = card_image.resize((cardimage_width, cardimage_height))
# Convert the resized image to a PhotoImage
        card_image = ImageTk.PhotoImage(cardresized_image)
# Create a label to display the resized background image
        card_label = Label(root, image=card_image)
        candec=False

    


    card_label.place(x=105, y=120, width=current_width, height=cardimage_height)
    root.after(2,animatecardimage);

def updatetime():
    global timer
    response = requests.get("http://localhost:3000/timeleft")
    jsontimerdata  = response.json()

    global nextgameid;
    global nextgamedate;
    global nextgametime;
    nextgamedate = str(jsontimerdata['nextgamedate']);
    nextgametime = str(jsontimerdata['nextgametime']);
    nextgameid = str(jsontimerdata['gameid'])
    
    timer=(jsontimerdata['time'])
    gifteventcode.config(text="Gift Event Code \n"+str(jsontimerdata["gameid"]));
    END

updatetime()
def update():
    global timer
   
    global nextgamedate;
    global nextgametime;
    global nextgameid;
   
    timer -=1
    if(timer < 1):


        subprocess.run(["python", "./result.py",str(nextgamedate),str(nextgametime),str(nextgameid)])


        updateuserdata();
        get_all_result()
        updatetime()
    countdowntext.config(text=" countdown \n "+str(format_timer(timer)))
    root.after(1000, update)

def keypressupdate(event):
    totalbetamount = 0
    for bet in betentries:
        # Assuming bet.get() returns a string, you might want to convert it to an integer for comparison
        if bet.get().strip():
            totalbetamount+=int(bet.get())
        END
    balanceone.delete(0,tkinter.END)
    balancetwo.delete(0,tkinter.END)
    balanceone.insert(0,totalbetamount)
    balancetwo.insert(0,totalbetamount)
    END
    

root.bind("<KeyPress>",keypressupdate)
root.after(0, update)
root.after(0, animatecardimage)

balancetext.place(x=650,y = 10)
root.mainloop()
