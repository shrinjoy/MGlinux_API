import usb.core

# Find USB printer
def find_usb_printer():
    dev = usb.core.find(find_all=True)

    for cfg in dev:
        idVendor = cfg.idVendor
        idProduct = cfg.idProduct
        return idVendor, idProduct

# Get USB printer information
idVendor, idProduct = find_usb_printer()




print(str(idVendor));
print(str(idProduct));
from escpos.printer import Usb

# Initialize the printer
printer = Usb(idVendor, idProduct, 0)

# Send text to the printer
printer.text("Hello, ESC/POS World!\n")
printer.text("This is a test print.\n")

# Print a barcode (if supported by your printer)
printer.barcode('123456789012', 'EAN13', 64, 2, '', '')

# Cut the paper
printer.cut()

# Close the connection to the printer
printer.close()