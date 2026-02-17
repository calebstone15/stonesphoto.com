#!/usr/bin/env python3
"""
Image to WebP Converter

A simple script that opens a file dialog to select an image from your device
and converts it to WebP format.

Requirements:
    pip install Pillow

Usage:
    python convert_to_webp.py
"""

import os
import sys
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow library is required.")
    print("Install it with: pip install Pillow")
    sys.exit(1)


class WebPConverter:
    """Handles the logic for converting images to WebP format."""

    @staticmethod
    def convert_image(input_path, output_path, quality=85, method=6):
        """
        Convert an image to WebP format.

        Args:
            input_path (str): Path to the input image.
            output_path (str): Path to save the output WebP image.
            quality (int): Quality of the output image (0-100).
            method (int): Compression method (0-6).

        Returns:
            dict: A dictionary containing conversion details (original_size, webp_size, reduction).
        """
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for images with transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Keep alpha channel for WebP
                img = img.convert('RGBA')
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            # Save as WebP with good quality
            img.save(output_path, 'WEBP', quality=quality, method=method)

        # Get file sizes for comparison
        original_size = os.path.getsize(input_path)
        webp_size = os.path.getsize(output_path)
        reduction = ((original_size - webp_size) / original_size) * 100

        return {
            "original_size": original_size,
            "webp_size": webp_size,
            "reduction": reduction
        }


class ConverterGUI:
    """Manages the graphical user interface for the converter."""

    def __init__(self):
        self.root = tk.Tk()
        self.root.withdraw()  # Hide the main window
        self.root.lift()
        self.root.attributes('-topmost', True)

    def get_input_path(self):
        """Open file dialog to select input image."""
        filetypes = [
            ("Image files", "*.png *.jpg *.jpeg *.gif *.bmp *.tiff *.tif *.webp"),
            ("PNG files", "*.png"),
            ("JPEG files", "*.jpg *.jpeg"),
            ("GIF files", "*.gif"),
            ("BMP files", "*.bmp"),
            ("TIFF files", "*.tiff *.tif"),
            ("All files", "*.*")
        ]

        return filedialog.askopenfilename(
            title="Select an image to convert to WebP",
            filetypes=filetypes
        )

    def get_save_path(self, input_path):
        """Open file dialog to select save location."""
        input_file = Path(input_path)
        output_path = input_file.with_suffix('.webp')

        return filedialog.asksaveasfilename(
            title="Save WebP file as",
            defaultextension=".webp",
            filetypes=[("WebP files", "*.webp")],
            initialfile=output_path.name,
            initialdir=input_file.parent
        )

    def show_success(self, save_path, stats):
        """Show success message."""
        success_msg = (
            f"Successfully converted to WebP!\n\n"
            f"Saved to: {save_path}\n\n"
            f"Original size: {stats['original_size'] / 1024:.1f} KB\n"
            f"WebP size: {stats['webp_size'] / 1024:.1f} KB\n"
            f"Size reduction: {stats['reduction']:.1f}%"
        )
        print(success_msg)
        messagebox.showinfo("Conversion Complete", success_msg)

    def show_error(self, title, message):
        """Show error message."""
        print(f"{title}: {message}")
        messagebox.showerror(title, message)

    def run(self):
        """Run the converter GUI workflow."""
        input_path = self.get_input_path()

        if not input_path:
            print("No file selected. Exiting.")
            self.root.destroy()
            return

        print(f"Selected: {input_path}")

        save_path = self.get_save_path(input_path)

        if not save_path:
            print("No save location selected. Exiting.")
            self.root.destroy()
            return

        try:
            stats = WebPConverter.convert_image(input_path, save_path)
            self.show_success(save_path, stats)

        except OSError as e:
            self.show_error("Conversion Error", f"Error converting image: {str(e)}")
        except Exception as e:  # pylint: disable=broad-exception-caught
            self.show_error("Error", f"Unexpected error: {str(e)}")
        finally:
            self.root.destroy()


if __name__ == "__main__":
    print("Image to WebP Converter")
    print("-" * 30)
    app = ConverterGUI()
    app.run()
