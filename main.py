import usb.core
from escpos.printer import Usb

# Find the USB printer automatically
def find_usb_printer():
    usb_devices = usb.core.find(find_all=True)

    for dev in usb_devices:
        try:
            printer = Usb(dev)
            return printer
        except Exception:
            pass

    return None

def print_text(printer):
    printer.text("Hello, this is a test message!\n")
    printer.cut()

if __name__ == "__main__":
    try:
        printer = find_usb_printer()

        if printer:
            print_text(printer)
            print("Printing successful!")
        else:
            print("No USB printer found.")
    except:
        print("failed to find printer");
