import requests
from bs4 import BeautifulSoup
import pymongo
import tkinter as tk

# Create a function to scrape data and store it in MongoDB
def scrape_and_store_data():
    # Get user inputs from the GUI
    url = url_entry.get()
    keyword = keyword_entry.get()

    # Send an HTTP GET request to the URL
    response = requests.get(url)

    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find and extract data based on HTML structure (placeholder)
        # You can customize these lines to match the structure of the web page
        data = soup.find_all('p')

        # Initialize a connection to MongoDB
        client = pymongo.MongoClient("mongodb://user:passwd@mongodb:27017/dump1")
        db = client["dump1"]
        collection = db["scraped_data"]

        # Store the scraped data in MongoDB
        for item in data:
            if keyword in item.get_text():
                result = {"text": item.get_text()}
                collection.insert_one(result)

        result_text.delete(1.0, tk.END)
        result_text.insert(tk.END, "Data scraped and stored in MongoDB")

    else:
        result_text.delete(1.0, tk.END)
        result_text.insert(tk.END, "Failed to retrieve the webpage")

# Create a Tkinter window
window = tk.Tk()
window.title("Web Scraping and MongoDB Tool")

# Create labels and entry fields for user input
url_label = tk.Label(window, text="Enter URL:")
url_label.pack()
url_entry = tk.Entry(window)
url_entry.pack()

keyword_label = tk.Label(window, text="Enter Keyword:")
keyword_label.pack()
keyword_entry = tk.Entry(window)
keyword_entry.pack()

# Create a button to trigger web scraping and data storage
scrape_button = tk.Button(window, text="Scrape and Store Data", command=scrape_and_store_data)
scrape_button.pack()

# Create a text box to display results
result_text = tk.Text(window, height=5, width=40)
result_text.pack()

# Start the Tkinter main loop
window.mainloop()
