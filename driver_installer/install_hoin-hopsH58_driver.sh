#!/bin/bash

driverpath="./driver/H58"

# Ensure Makefile is executable
sudo chmod +x "$driverpath/Makefile"

# Compile the printer driver
sudo make -C "$driverpath"

# Ensure rastertopos58 is executable
sudo chmod +x $driverpath/rastertopos58

# Copy the filter to CUPS filter directory
sudo cp -r $driverpath/rastertopos58 /usr/lib/cups/filter

echo "Finished installing the driver."

echo "Please add the printer from Settings > Printer > Add Printer :D"
