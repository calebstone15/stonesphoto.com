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
    """Class to handle image conversion logic."""
    # pylint: disable=too-few-public-methods

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
            dict: Conversion details (original_size, webp_size, reduction).
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
        if original_size > 0:
            reduction = ((original_size - webp_size) / original_size) * 100
        else:
            reduction = 0

        return {
            "original_size": original_size,
            "webp_size": webp_size,
            "reduction": reduction
        }


class ConverterGUI:
    """Class to handle the GUI interactions."""
    # pylint: disable=too-few-public-methods

    def __init__(self):
        self.root = tk.Tk()
        self.root.withdraw()

    def run(self):
        """Run the selection and conversion process."""
        self.root.lift()
        self.root.attributes('-topmost', True)

        try:
            input_path = self._select_input_file()
            if not input_path:
                print("No file selected. Exiting.")
                return

            print(f"Selected: {input_path}")
            save_path = self._select_save_location(input_path)
            if not save_path:
                print("No save location selected. Exiting.")
                return

            self._process_conversion(input_path, save_path)

        finally:
            self.root.destroy()

    def _select_input_file(self):
        """Open dialog to select input file."""
        filetypes = [
            ("Image files",
             "*.png *.jpg *.jpeg *.gif *.bmp *.tiff *.tif *.webp"),
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

    def _select_save_location(self, input_path):
        """Open dialog to select save location."""
        input_file = Path(input_path)
        output_path = input_file.with_suffix('.webp')
        return filedialog.asksaveasfilename(
            title="Save WebP file as",
            defaultextension=".webp",
            filetypes=[("WebP files", "*.webp")],
            initialfile=output_path.name,
            initialdir=input_file.parent
        )

    def _process_conversion(self, input_path, save_path):
        """Execute conversion and show result."""
        try:
            converter = WebPConverter()
            stats = converter.convert_image(input_path, save_path)
            self._show_success(save_path, stats)
        except OSError as e:
            self._show_error("Conversion Error", f"Error: {str(e)}")
        except Exception as e:  # pylint: disable=broad-exception-caught
            self._show_error("Error", f"Unexpected error: {str(e)}")

    def _show_success(self, save_path, stats):
        """Show success message."""
        msg = (
            f"Successfully converted to WebP!\n\n"
            f"Saved to: {save_path}\n\n"
            f"Original size: {stats['original_size'] / 1024:.1f} KB\n"
            f"WebP size: {stats['webp_size'] / 1024:.1f} KB\n"
            f"Size reduction: {stats['reduction']:.1f}%"
        )
        print(msg)
        messagebox.showinfo("Conversion Complete", msg)

    def _show_error(self, title, message):
        """Show error message."""
        print(message)
        messagebox.showerror(title, message)


if __name__ == "__main__":
    print("Image to WebP Converter")
    print("-" * 30)
    app = ConverterGUI()
    app.run()
