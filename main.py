import keyboard

def on_key_event(e):
    if e.event_type == keyboard.KEY_DOWN:
        print(f"Barcode scanned: {e.name}")

keyboard.hook(on_key_event)

# Keep the script running
keyboard.wait()