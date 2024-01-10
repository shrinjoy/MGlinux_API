import asyncio
import json
import tkinter
from tkinter import *
import requests
from PIL import Image, ImageTk
root = Tk()
root.title("magic deluxe")
root.geometry('1024x768+100+100')
root.minsize(1024, 768)
root.maxsize(1024, 768)
root.configure(background="yellow")

text = Label(root, text="Magic Deluxe", background="yellow", font=("Arial", 20, "bold"), fg="red")

text.place(x=0, y=0, width=200, height=30)

countdowntimer = 0
countdowntext = Label(root,text=countdowntimer, background="yellow", font=("Arial", 8,"bold"))
gifteventcode = Label(root,text="Gift Event Code \n", background="yellow", font=("Arial", 8,"bold"))
gifteventcode.place(x=0, y=50)

countdowntext.place(x=250, y=50)

betentries = []

oldposx = 450
spacingx = 45
oldposy = 50
spacingy = 50

for y in range(10):
    oldposx = 450
    oldposy = oldposy + spacingy
    for x in range(10):
        label_text = "MG" + str(y) + str(x)
        Label(root,background="green", anchor="nw",text=label_text).place(x=oldposx, y=oldposy - 30, width=60, height=60)
        entry_widget = Entry(root, justify=CENTER)
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

card_image = Image.open("1.jpeg")
cardimage_width=200
cardimage_height=200
# Resize the image to fit within the desired dimensions (e.g., 200x200)
cardresized_image = card_image.resize((cardimage_width, cardimage_height))
# Convert the resized image to a PhotoImage
card_image = ImageTk.PhotoImage(cardresized_image)
# Create a label to display the resized background image
card_label = Label(root, image=card_image)
card_label.place(x=55, y=120, width=cardimage_width, height=cardimage_height)


def buyticket():
    betstring = ""
    betindex = 0
    totalbet=0;
    for bet in betentries:
        # Assuming bet.get() returns a string, you might want to convert it to an integer for comparison
        if bet.get().strip():
            if betindex > 0:
                betstring += ","
            END
            betstring += str(betindex) + "RS" + str(bet.get())
            totalbet+=int(bet.get())
        END
        betindex += 1
    END
    print("betentries:"+betstring)
    print("totalbet:"+str(totalbet))
END


stonebutton = Button(root,text="Stones",background="white",foreground="black",command=buyticket,font=("Aerial",15,"bold")).place(x=50,y=650)
luckystonebutton = Button(root,text="F2 Lucky Stone",background="white",foreground="black",command=buyticket,font=("Aerial",15,"bold")).place(x=150,y=650)

buybutton = Button(root,text="F6-Buy",background="red",foreground="black",command=buyticket,font=("Aerial",15,"bold")).place(x=50,y=700)
clearbutton = Button(root,text="F5-Clear",background="skyblue",foreground="black",font=("Aerial",15,"bold")).place(x=150,y=700)
cancelticketbutton = Button(root,text="F5-Cancel",background="skyblue",foreground="black",font=("Aerial",15,"bold")).place(x=250,y=700)
lastreceiptbutton = Button(root,text="Last Reciept",background="skyblue",foreground="black",font=("Aerial",15,"bold")).place(x=380,y=700)
exitbutton = Button(root,text="Exit(X)",background="red",foreground="black",font=("Aerial",15,"bold")).place(x=680,y=700)
#luckystonebutton = Button(root,text="F2 Lucky Stone",background="white",foreground="black",command=buyticket,font=("Aerial",15,"bold")).place(x=150,y=650)



resultlistbox  = Listbox(root,font=("Aerial",20,"bold"),background="Red")


import requests

def get_all_result():
    response = requests.get("http://localhost:3000/getallresult")

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        json_data = response.json()

        # Create an iterator for the items
        items_iter = iter(json_data.items())

        # Iterate over pairs of keys and values, printing two entries per line
        for (key1, value1), (key2, value2) in zip(items_iter, items_iter):
            resultlistbox.insert(tkinter.END,f"{key1}: {value1}     {key2}: {value2}")
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")


resultlistbox.place(x=0,y=400,width=350,height=200)

get_all_result()
def format_timer(seconds):
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)

    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
def update():
    global countdowntimer
    response = requests.get("http://localhost:3000/timeleft")

    jsontimerdata  = response.json()
    if(jsontimerdata['time'] <1):
        get_all_result()

    countdowntext.config(text=" countdown \n "+str(format_timer(jsontimerdata['time'])))
    gifteventcode.config(text="Gift Event Code \n"+str(jsontimerdata["gameid"]));
    root.after(1000, update)


root.after(0, update)
root.mainloop()
