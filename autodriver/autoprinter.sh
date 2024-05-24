#!/bin/bash
# Replace these variables with your actual values
hoin="hoin_pos58"
pos58ppd="./pos58.ppd"
epson="epson_80"
epson80ppd="./epson80.ppd"
genericthermal="genericthermal"
genericthermalppd="./genericthermal.ppd"



# Find the URI of the USB printer
printer_uri=$(lpinfo -v | grep "usb://" | cut -d ' ' -f 2)

# Add the printer to CUPS
sudo lpadmin -p "$hoin" -E -v "$printer_uri" -P "$pos58ppd"
sudo lpadmin -p "$epson" -E -v "$printer_uri" -P "$epson80ppd"
sudo lpadmin -p "$genericthermal" -E -v "$printer_uri" -P "$genericthermalppd"

sudo chmod +x ./filters/*
sudo cp ./filters/* /usr/lib/cups/filter/

# Restart CUPS
sudo systemctl restart cups
